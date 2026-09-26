import type { Service } from "./services";

// Practices can belong to several disciplines. Filtering must not hide a
// transaction or regulatory capability merely because its primary label differs.
const facets = [
 ["Corporate", "Legal", "Compliance", "Transactions"],
 ["Regulatory", "Compliance", "Technology", "Risk"],
 ["Regulatory", "Compliance", "Legal"],
 ["Corporate", "Transactions", "International"],
 ["Regulatory", "Compliance"],
 ["Legal", "Technology", "Transactions"],
 ["Regulatory", "Compliance", "International", "Transactions"],
 ["Legal", "Corporate", "Transactions"],
 ["Regulatory", "Compliance", "Technology", "Transactions"],
 ["Corporate", "Transactions", "Technology"],
 ["Legal", "Compliance", "Risk"],
 ["Corporate", "Legal"], ["Legal"], ["Legal", "Regulatory"],
 ["Legal", "Regulatory", "Technology"], ["Legal"],
 ["Legal", "Regulatory", "Transactions"], ["Compliance", "Regulatory", "International"],
 ["Risk", "Corporate", "Compliance"], ["Risk", "Compliance", "Regulatory"],
 ["International", "Transactions", "Corporate", "Regulatory"],
];
const normalize = (value: string) => value.toLowerCase().replace(/m\s*&\s*a/g, "mergers acquisitions").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
export function matchesService(service: Service, query: string, category: string) {
  const index = Number(service.number) - 1;
  if (category !== "All" && !facets[index].includes(category)) return false;
  const searchable = normalize([service.title, service.shortDescription, ...service.subServices.flatMap(group => [group.title, ...group.children])].join(" "));
  const tokens = normalize(query).split(/\s+/).filter(token => token && token !== "and");
  return tokens.every(token => searchable.includes(token));
}
