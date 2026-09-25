export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { message: "This request is not permitted." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return Response.json(
      { message: "Your enquiry is too long." },
      { status: 413 },
    );

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json(
      { message: "Please submit a valid enquiry." },
      { status: 400 },
    );
  }

  const getField = (key: string) => String(data.get(key) || "").trim();

  const fields = Object.fromEntries(
    [
      "name",
      "email",
      "company",
      "phone",
      "designation",
      "service",
      "industry",
      "technology",
      "solution",
      "category",
      "requirement",
      "country",
      "state",
      "city",
      "companyType",
      "companySize",
      "timeline",
      "preferredContact",
      "agreementType",
      "matterStage",
      "licenceNeed",
      "regulator",
      "currentStatus",
      "transactionType",
      "countriesInvolved",
      "transactionStage",
      "ipRequirement",
      "location",
      "message",
      "consent",
      "website",
      "pageUrl",
      "pageTitle",
      "pathname",
      "referrer",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "formType",
      "source",
    ].map((key) => [key, getField(key)]),
  );

  if (fields.website)
    return Response.json(
      { message: "Unable to submit this enquiry." },
      { status: 400 },
    );

  const hasPrimarySelection = Boolean(
    fields.service || fields.industry || fields.technology || fields.requirement || fields.category || fields.formType === "home",
  );

  const companyRequired = fields.formType !== "home";
  const messageRequired = fields.message.length >= 10 || fields.formType === "home";

  if (
    fields.name.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(fields.email) ||
    (companyRequired && !fields.company) ||
    !hasPrimarySelection ||
    !fields.country ||
    !messageRequired ||
    fields.consent !== "yes" ||
    Object.values(fields).some((value) => typeof value === "string" && value.length > 5000)
  )
    return Response.json(
      { message: "Please check all required fields and provide your consent." },
      { status: 400 },
    );

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook)
    return Response.json(
      {
        message:
          "Online enquiries are not available yet. Please call +91 9311664455 or email advisory@astronisglobal.com. Your enquiry has not been sent.",
      },
      { status: 503 },
    );

  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("HTTPS required");

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...fields,
        submittedAt: new Date().toISOString(),
        type: fields.formType || fields.category || "enquiry",
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!result.ok) throw new Error("Delivery failed");
    return Response.json({
      message:
        "Thank you. Your enquiry has been received. Our team will contact you shortly.",
    });
  } catch {
    return Response.json(
      {
        message:
          "We could not deliver your enquiry. Please try again or contact our team directly.",
      },
      { status: 502 },
    );
  }
}
