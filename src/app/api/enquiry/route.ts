import { Resend } from "resend";

export const runtime = "nodejs";

const FAILURE_MESSAGE = "We couldn't submit your enquiry. Please try again.";
const SUCCESS_MESSAGE = "Your enquiry has been submitted successfully.";
const allowedFormTypes = new Set(["home", "industry", "service", "technology"]);
const fieldNames = [
  "name", "email", "company", "phone", "designation", "service", "industry",
  "technology", "solution", "category", "requirement", "country", "state", "city",
  "companyType", "companySize", "timeline", "projectTimeline", "preferredContact",
  "agreementType", "matterStage", "licenceNeed", "regulator", "currentStatus",
  "transactionType", "countriesInvolved", "transactionStage", "ipRequirement", "location",
  "message", "consent", "website", "pageUrl", "pageTitle", "pathname", "referrer",
  "utmSource", "utmMedium", "utmCampaign", "formType", "source", "detailAnswer",
] as const;

type EnquiryFields = Record<(typeof fieldNames)[number], string>;

const emptyFields = (): EnquiryFields =>
  Object.fromEntries(fieldNames.map((field) => [field, ""])) as EnquiryFields;

const sanitize = (value: unknown) =>
  String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, 2000);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);

const labels: Partial<Record<keyof EnquiryFields, string>> = {
  formType: "Form Type", pageUrl: "Page", name: "Name", email: "Business Email",
  phone: "Phone / WhatsApp", company: "Company", designation: "Designation",
  industry: "Industry", requirement: "Industry Requirement", service: "Service",
  detailAnswer: "Sub-Service Detail", technology: "Technology Area", solution: "Technology Solution",
  country: "Country", state: "State", city: "City", timeline: "Timeline",
  projectTimeline: "Timeline", preferredContact: "Preferred Contact", message: "Requirement Details",
  utmSource: "UTM Source", utmMedium: "UTM Medium", utmCampaign: "UTM Campaign",
};

const subjectFor = (fields: EnquiryFields) => {
  const type = fields.formType === "service" ? `Service Enquiry${fields.service ? ` | ${fields.service}` : ""}`
    : fields.formType === "industry" ? `Industry Enquiry${fields.industry ? ` | ${fields.industry}` : ""}`
      : fields.formType === "technology" ? `Technology Enquiry${fields.technology ? ` | ${fields.technology}` : ""}`
        : "Website Enquiry | Home";
  return `New ${type}`;
};

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 413 });

  let raw: Record<string, unknown>;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("JSON required");
    raw = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 400 });
  }

  const fields = emptyFields();
  for (const field of fieldNames) fields[field] = sanitize(raw[field]);
  if (fields.website || !allowedFormTypes.has(fields.formType))
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 400 });

  const primarySelection = fields.requirement || fields.service || fields.industry || fields.technology || fields.category;
  const companyRequired = fields.formType !== "home";
  const valid = fields.name.length >= 2 && fields.name.length <= 120 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) && fields.email.length <= 254 &&
    (!companyRequired || Boolean(fields.company)) && Boolean(primarySelection) &&
    Boolean(fields.country) && fields.message.length >= 10 && fields.consent === "yes";
  if (!valid) return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Enquiry submission failed: email provider is not configured");
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 503 });
  }

  const entries = Object.entries(fields)
    .filter(([key, value]) => value && !["website", "consent", "category", "source", "detailAnswer"].includes(key))
    .map(([key, value]) => [labels[key as keyof EnquiryFields] || key, value] as const);
  const text = entries.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = entries.map(([label, value]) => `<p><strong>${escapeHtml(label)}</strong><br />${escapeHtml(value).replace(/\n/g, "<br />")}</p>`).join("");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: ["advisory@astronisglobal.com"],
      replyTo: fields.email,
      subject: subjectFor(fields),
      text,
      html,
    });
    if (result.error) throw new Error(result.error.message);
    return Response.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Enquiry submission failed:", error instanceof Error ? error.message : "Unknown email provider error");
    return Response.json({ success: false, message: FAILURE_MESSAGE }, { status: 502 });
  }
}
