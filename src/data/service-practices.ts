import { services } from "./services";
import { formationContent } from "./corporate-formation-content";
import { structuringContent, transactionContent, governanceContent, contractContent, restructuringContent } from "./corporate-group-content";
import { serviceAnchor, type ServicePractice } from "./service-detail-types";

const corporate = services[0];
const groupContent = [formationContent, structuringContent, transactionContent, governanceContent, contractContent, restructuringContent];
const groupMeta = [
  {
    slug: "entity-formation-business-setup", shortTitle: "Entity Formation", icon: "building", image: corporate.image,
    description: "Establish the right foundation for your business. We help entrepreneurs, enterprises and international organisations assess entity options and coordinate the corporate, documentary and regulatory work involved in establishing a presence in India.",
    introduction: "The right setup begins with your business model, ownership and plans for growth. Compare the structures below, then bring your intended activities, founder or parent details and operational priorities into the formation discussion.",
    cta: "Explore Entity Formation", badges: ["Company Incorporation", "LLP", "Partnership", "Subsidiary", "Foreign Company", "Branch Office"],
    faqs: [
      { question: "How do we choose an appropriate business structure?", answer: "Start with the intended activities, ownership, funding plans and operating locations. These facts help advisors compare structures and identify the corporate, regulatory and tax questions requiring review. The appropriate choice depends on the business rather than a single standard recommendation." },
      { question: "What should we prepare for an initial formation discussion?", answer: "Prepare a short business description, proposed owner and management details, expected locations, funding plans and any intended overseas participation. An existing group structure chart is helpful if the new entity will belong to a wider organisation." },
      { question: "Does incorporation complete every setup requirement?", answer: "The formation engagement should distinguish incorporation from activity-specific registrations, commercial agreements, employment arrangements and ongoing responsibilities. Those workstreams can be identified and coordinated alongside the establishment plan." },
      { question: "Can the setup assessment include an overseas parent or investor?", answer: "Yes. Share the parent or investor profile and proposed activities so the establishment assessment can be coordinated with foreign investment, governance and other specialist inputs relevant to the proposed structure." },
    ],
  },
  {
    slug: "entity-structuring-group-reorganisation", shortTitle: "Entity Structuring", icon: "chart", image: "/images/services/business-advisory-and-consulting.webp",
    description: "Design a structure around the way your business needs to work. Connect ownership, investment, governance, succession and operational requirements through considered entity and group arrangements.",
    introduction: "A useful structure explains where activity sits, how decisions are made and how responsibilities move between entities. Begin with the current position and your intended outcome, then assess the dependencies that affect implementation.",
    cta: "Explore Entity Structuring", badges: ["Ownership", "Group Structures", "Capital", "Succession"],
    faqs: [
      {question:"What information helps a structuring review?",answer:"A current ownership chart, entity list, activity summary and key funding or shareholder arrangements provide a useful starting point. Explain the commercial objective and any operational constraints on the proposed change."},
      {question:"Can a review cover an existing group?",answer:"Yes. The work can compare the existing arrangements with a proposed target structure, identify dependencies and develop an implementation roadmap with the relevant specialists."},
    ],
  },
  {
    slug: "mergers-acquisitions-transactions", shortTitle: "M&A & Transactions", icon: "globe", image: "/images/services/nclt-and-nclat-advisory.webp",
    description: "Move from transaction rationale to an organised execution process. We support buyers, sellers, investors and businesses across structuring, diligence, negotiations, documentation and completion.",
    introduction: "A transaction brings multiple decisions together under a common timetable. Define the perimeter, understand the issues that affect the deal and connect findings with the documents and actions needed for completion.",
    cta: "Explore Transactions", badges: ["M&A", "Buy-Side", "Sell-Side", "Due Diligence", "Private Equity"],
    faqs: [
      {question:"When should transaction advisors be involved?",answer:"An early discussion can help define the transaction perimeter, diligence scope and implementation dependencies before a timetable or document position becomes fixed. The appropriate scope depends on the stage of the proposed deal."},
      {question:"Can the engagement focus on one transaction workstream?",answer:"Yes. The scope can be tailored to a specific requirement such as diligence, documentation or closing coordination, with responsibilities and interfaces agreed at the outset."},
    ],
  },
  {
    slug: "corporate-governance", shortTitle: "Corporate Governance", icon: "shield", image: "/images/services/hr-and-employment-advisory.webp",
    description: "Make oversight and accountability part of the operating model. Build practical governance arrangements for directors, shareholders, committees and management, supported by clear processes and reliable records.",
    introduction: "Governance is most effective when responsibilities are understood and decision-making processes reflect the business. Explore support from individual board matters to broader framework design and governance review.",
    cta: "Explore Corporate Governance", badges: ["Board Advisory", "Shareholders", "Committees", "Policies"],
    faqs: [
      {question:"What is the starting point for a governance review?",answer:"We first agree the scope and understand the ownership and operating model. Existing authority documents, board records, shareholder arrangements and internal policies help establish how governance is intended to work."},
      {question:"Can a governance framework be adapted as a business grows?",answer:"Yes. A review can identify where responsibilities, reporting or decision processes need to evolve with new entities, investors or business activities."},
    ],
  },
  {
    slug: "commercial-contracts", shortTitle: "Commercial Contracts", icon: "file", image: "/images/services/intellectual-property-rights.webp",
    description: "Turn commercial expectations into workable agreements. We support drafting, review, negotiation and contract management across investments, partnerships, supply relationships and day-to-day business operations.",
    introduction: "A contract should reflect what the parties will actually do and how they will manage change. Start with the commercial brief, involve the people responsible for delivery and keep the obligations visible after signature.",
    cta: "Explore Commercial Contracts", badges: ["Drafting", "Review", "Negotiation", "Agreements", "Contract Management"],
    faqs: [
      {question:"What makes a useful contract brief?",answer:"Explain the parties' roles, deliverables, timing, payments and important dependencies. Include any draft, term sheet or existing agreement and identify the issues your team wants the review to address."},
      {question:"Can you review the other party's draft?",answer:"Yes. The agreed scope can focus on a counterparty draft, material negotiation points or consistency across a wider document suite. Commercial context helps prioritise the review."},
    ],
  },
  {
    slug: "corporate-restructuring", shortTitle: "Corporate Restructuring", icon: "building", image: "/images/services/rera-and-real-estate-advisory.webp",
    description: "Reorganise with a clear purpose and a coordinated implementation plan. Assess corporate changes for operational alignment, investment, business transfers, strategic combinations or an orderly exit.",
    introduction: "Restructuring connects a commercial objective with changes to entities, ownership, assets and working relationships. Each route needs an assessment of stakeholder arrangements, operational continuity and specialist inputs before implementation.",
    cta: "Explore Corporate Restructuring", badges: ["Merger", "Demerger", "Business Transfer", "Reorganisation", "Exit"],
    faqs: [
      {question:"How is a restructuring route selected?",answer:"The starting point is the intended commercial outcome, the entities involved and their existing obligations. Corporate, financial, tax and regulatory inputs can then be coordinated to assess possible implementation routes."},
      {question:"Can restructuring support include implementation?",answer:"The scope can include a roadmap, document coordination, corporate actions and follow-up tracking. Responsibilities and specialist workstreams should be agreed for the particular proposal."},
    ],
  },
];

export const corporateCommercial: ServicePractice = {
  title: corporate.title,
  slug: corporate.canonicalSlug,
  aliases: [corporate.slug, "corporate-advisory"],
  description: "Astronis supports founders, investors and enterprises through the corporate lifecycle, connecting business formation and ownership structures with transactions, governance, contracts and strategic change.",
  heroStatement: "Corporate structures, transactions & governance built for sustainable growth.",
  introHeading: "Advisory Across the Corporate Lifecycle",
  introduction: "A company's needs change as it establishes an entity, brings in investors, acquires a business or prepares for an exit. Ownership structures, governance, commercial agreements and reorganisations must work together. Our six service groups connect these decisions with the stage, priorities and operating realities of your business.",
  lifecycle: ["Start Business", "Structure", "Raise Capital", "Transact", "Govern", "Restructure", "Scale"],
  badges: ["Entity Formation", "Corporate Structuring", "M&A", "Governance", "Commercial Contracts", "Corporate Restructuring", "Transaction Advisory", "Legal Due Diligence"],
  groups: corporate.subServices.map((group, index) => ({
    ...groupMeta[index], title: group.title,
    children: group.children.map((title, childIndex) => ({title, slug: serviceAnchor(title), ...groupContent[index][childIndex]})),
  })),
  knowledgeTitle: "Corporate & Commercial Knowledge Centre",
  enquiryHeading: "Discuss Your Corporate & Commercial Requirement",
  finalHeading: "Build the Right Corporate Foundation for What Comes Next",
  finalDescription: "Connect your growth plans with the right structures, transaction support, governance and restructuring advice.",
  relatedSlugs: ["regulatory-and-compliance", "fema-fdi-and-foreign-exchange-advisory", "gst-and-indirect-tax-regulatory-support"],
  expertSlugs: ["krishna-kumar-mishra", "krishna-nand-mishra", "puneet-kumar-verma"],
};

export const servicePractices: ServicePractice[] = [corporateCommercial];
export function resolvePractice(slugs: string[]) {
  if (slugs.length > 2) return null;
  const practice = servicePractices.find(item => item.slug === slugs[0]);
  if (!practice) return null;
  const group = slugs.length === 2 ? practice.groups.find(item => item.slug === slugs[1]) : undefined;
  if (slugs.length === 2 && !group) return null;
  return {practice, group};
}
