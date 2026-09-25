export type ServiceRequirementOption = {
  label: string;
  question?: string;
  options?: string[];
};

export type ServiceFormEntry = {
  id: string;
  label: string;
  requirements: ServiceRequirementOption[];
};

export const serviceFormConfig: ServiceFormEntry[] = [
  {
    id: "corporate-and-commercial-advisory",
    label: "Corporate & Commercial Advisory",
    requirements: [
      { label: "Corporate Structuring" },
      { label: "Commercial Contracts", question: "Agreement Type", options: ["Service Agreement", "Vendor Agreement", "Shareholders Agreement", "NDA", "Distribution Agreement", "Employment Agreement", "Licensing Agreement", "Other"] },
      { label: "Corporate Governance" },
      { label: "Mergers & Acquisitions" },
      { label: "Joint Ventures" },
      { label: "Corporate Restructuring" },
      { label: "Due Diligence" },
      { label: "Fund Raising" },
      { label: "Cross-Border Transactions" },
      { label: "General Advisory" },
      { label: "Other" },
    ],
  },
  {
    id: "business-advisory-and-consulting",
    label: "Business Advisory & Consulting",
    requirements: [
      { label: "Strategic Planning" },
      { label: "Growth Strategy" },
      { label: "Operational Improvement" },
      { label: "Risk Management" },
      { label: "Market Entry" },
      { label: "Transformation Advisory" },
      { label: "Other" },
    ],
  },
  {
    id: "banking-nbfc-and-financial-services-advisory",
    label: "Banking, NBFC & Financial Services Advisory",
    requirements: [
      { label: "NBFC / HFC Advisory" },
      { label: "RBI / Regulatory Advisory" },
      { label: "Risk & Governance" },
      { label: "Digital Lending" },
      { label: "Commercial Contracts" },
      { label: "Due Diligence" },
      { label: "Other" },
    ],
  },
  {
    id: "startup-and-investment-advisory",
    label: "Startup & Investment Advisory",
    requirements: [
      { label: "Entity Structuring" },
      { label: "Fundraising" },
      { label: "Investor Documents" },
      { label: "Founders’ Arrangements" },
      { label: "Growth Advisory" },
      { label: "Investment Review" },
      { label: "Other" },
    ],
  },
  {
    id: "intellectual-property-rights",
    label: "Intellectual Property Rights",
    requirements: [
      { label: "Trademark" },
      { label: "Copyright" },
      { label: "Patent" },
      { label: "Industrial Design" },
      { label: "IP Strategy" },
      { label: "Licensing" },
      { label: "Assignment" },
      { label: "Infringement" },
      { label: "Opposition" },
      { label: "Portfolio Management" },
      { label: "Other" },
    ],
  },
  {
    id: "rera-and-real-estate-advisory",
    label: "RERA & Real Estate Advisory",
    requirements: [
      { label: "RERA Compliance" },
      { label: "Project Approvals" },
      { label: "Land / Title Review" },
      { label: "Development Agreements" },
      { label: "Leasing" },
      { label: "Joint Development" },
      { label: "Due Diligence" },
      { label: "Dispute Support" },
      { label: "Other" },
    ],
  },
  {
    id: "regulatory-and-compliance-services",
    label: "Regulatory & Compliance Services",
    requirements: [
      { label: "Licensing & Registrations" },
      { label: "Compliance Review" },
      { label: "Regulatory Representation" },
      { label: "Approval Support" },
      { label: "Policy Review" },
      { label: "Ongoing Compliance" },
      { label: "Other" },
    ],
  },
  {
    id: "licensing-and-registrations",
    label: "Licensing & Registrations",
    requirements: [
      { label: "New Licence", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Registration", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Renewal", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Modification", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Approval", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Compliance Support", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
      { label: "Need Consultation", question: "Current Status", options: ["Planning", "Not Started", "Application in Progress", "Query Received", "Approval Pending", "Existing Licence", "Unsure"] },
    ],
  },
  {
    id: "fema-fdi-and-foreign-exchange-advisory",
    label: "FEMA, FDI & Foreign Exchange Advisory",
    requirements: [
      { label: "Foreign Direct Investment", question: "Transaction Type", options: ["FDI", "ODI", "ECB", "Foreign Remittance", "Share Transfer", "Cross-Border Acquisition", "RBI Filing", "Investment Restructuring", "Other"] },
      { label: "Overseas Direct Investment", question: "Transaction Type", options: ["FDI", "ODI", "ECB", "Foreign Remittance", "Share Transfer", "Cross-Border Acquisition", "RBI Filing", "Investment Restructuring", "Other"] },
      { label: "External Commercial Borrowing", question: "Transaction Type", options: ["FDI", "ODI", "ECB", "Foreign Remittance", "Share Transfer", "Cross-Border Acquisition", "RBI Filing", "Investment Restructuring", "Other"] },
      { label: "Foreign Remittance", question: "Transaction Type", options: ["FDI", "ODI", "ECB", "Foreign Remittance", "Share Transfer", "Cross-Border Acquisition", "RBI Filing", "Investment Restructuring", "Other"] },
      { label: "Share Transfer", question: "Transaction Type", options: ["FDI", "ODI", "ECB", "Foreign Remittance", "Share Transfer", "Cross-Border Acquisition", "RBI Filing", "Investment Restructuring", "Other"] },
      { label: "Cross-Border Acquisition" },
      { label: "Investment Restructuring" },
      { label: "RBI Approval / Filing" },
      { label: "Other" },
    ],
  },
  {
    id: "gst-and-indirect-tax-regulatory-support",
    label: "GST & Indirect Tax Regulatory Support",
    requirements: [
      { label: "GST Registration" },
      { label: "Compliance Review" },
      { label: "Notice / Assessment Support" },
      { label: "Input Tax Credit" },
      { label: "Audit Support" },
      { label: "Other" },
    ],
  },
  {
    id: "nclt-and-nclat-advisory",
    label: "NCLT & NCLAT Advisory",
    requirements: [
      { label: "Corporate Insolvency" },
      { label: "Restructuring" },
      { label: "Reorganisation" },
      { label: "Representation" },
      { label: "Advisory" },
      { label: "Other" },
    ],
  },
  {
    id: "msme-advisory-and-disputes",
    label: "MSME Advisory & Disputes",
    requirements: [
      { label: "Business Advisory" },
      { label: "Dispute Resolution" },
      { label: "Compliance Support" },
      { label: "Credit / Recovery Support" },
      { label: "Other" },
    ],
  },
  {
    id: "arbitration-and-conciliation",
    label: "Arbitration & Conciliation",
    requirements: [
      { label: "Commercial Arbitration", question: "Matter Stage", options: ["Advice Required", "Notice Received", "Pre-Litigation", "Case Filed", "Hearing Ongoing", "Appeal", "Enforcement", "Other"] },
      { label: "Domestic Arbitration", question: "Matter Stage", options: ["Advice Required", "Notice Received", "Pre-Litigation", "Case Filed", "Hearing Ongoing", "Appeal", "Enforcement", "Other"] },
      { label: "International Arbitration", question: "Matter Stage", options: ["Advice Required", "Notice Received", "Pre-Litigation", "Case Filed", "Hearing Ongoing", "Appeal", "Enforcement", "Other"] },
      { label: "Live Matter Support", question: "Matter Stage", options: ["Advice Required", "Notice Received", "Pre-Litigation", "Case Filed", "Hearing Ongoing", "Appeal", "Enforcement", "Other"] },
      { label: "Pre-Litigation Advice", question: "Matter Stage", options: ["Advice Required", "Notice Received", "Pre-Litigation", "Case Filed", "Hearing Ongoing", "Appeal", "Enforcement", "Other"] },
      { label: "Other" },
    ],
  },
  {
    id: "drt-and-drat-matters",
    label: "DRT & DRAT Matters",
    requirements: [
      { label: "Debt Recovery" },
      { label: "Enforcement" },
      { label: "Representation" },
      { label: "Appeal / Review" },
      { label: "Strategic Advice" },
      { label: "Other" },
    ],
  },
  {
    id: "aft-and-cat-advisory-matters",
    label: "AFT & CAT Advisory Matters",
    requirements: [
      { label: "Tribunal Advisory" },
      { label: "Appeal Support" },
      { label: "Review / Representation" },
      { label: "Documentation" },
      { label: "Other" },
    ],
  },
  {
    id: "hr-and-employment-advisory",
    label: "HR & Employment Advisory",
    requirements: [
      { label: "Employment Contracts" },
      { label: "Policies & Compliance" },
      { label: "Workforce Structuring" },
      { label: "Employment Disputes" },
      { label: "HR Transformation" },
      { label: "Other" },
    ],
  },
  {
    id: "risk-governance-and-forensic-advisory",
    label: "Risk, Governance & Forensic Advisory",
    requirements: [
      { label: "Risk Assessment" },
      { label: "Governance Review" },
      { label: "Internal Controls" },
      { label: "Forensic Review" },
      { label: "Investigations" },
      { label: "Other" },
    ],
  },
  {
    id: "esg-and-sustainability-advisory",
    label: "ESG & Sustainability Advisory",
    requirements: [
      { label: "ESG Strategy" },
      { label: "Reporting" },
      { label: "Governance Review" },
      { label: "Risk & Controls" },
      { label: "Sustainability Compliance" },
      { label: "Other" },
    ],
  },
  {
    id: "cross-border-and-international-business-support",
    label: "Cross-Border & International Business Support",
    requirements: [
      { label: "India Market Entry" },
      { label: "Overseas Expansion" },
      { label: "Foreign Investment" },
      { label: "Cross-Border Transaction" },
      { label: "International Partnership" },
      { label: "Regulatory Compliance" },
      { label: "Tax Coordination" },
      { label: "Other" },
    ],
  },
];

export const serviceOptions = serviceFormConfig.map((service) => service.label);
