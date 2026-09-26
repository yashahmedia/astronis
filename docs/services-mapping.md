# Services hub: source and mapping

Source: `astronis menu.xlsx`, third worksheet, **Services**, inspected on 26 September 2026. The workbook is reference data; editorial notes in rows 5, 103, 181, 208, 274, 299, 358 and 373 were excluded from the service hierarchy. Column B contains counts, not services. Its count at row 362 differs from the actual 13 technology entries; all 13 are retained.

`src/data/service-hierarchy.json` preserves the 15 workbook families, 121 sub-services and 242 child entries, with original worksheet row references. `src/data/services.ts` maps these to the 21 existing dropdown identities in `service-identities.ts`. `site.ts` re-exports this portfolio for navigation and existing consumers. The existing legacy service-menu routes are retained.

| Existing practice | Workbook source |
| --- | --- |
| Corporate & Commercial Advisory | Corporate & Commercial, all six groups |
| Regulatory & Compliance Services | Regulatory Services; Technology, Privacy & Digital; Professional & Sector-Specific Advisory; Specialised Forums |
| Custom & Excise Advisory Services | Existing website scope retained; no exact workbook family |
| Business Advisory & Consulting | Business Advisory; Civil & Commercial and Criminal / Economic Offences |
| Licensing & Registrations | Licensing & Registrations |
| Intellectual Property Rights | Intellectual Property |
| FEMA, FDI & Foreign Exchange Advisory | FEMA, FDI & Cross-Border |
| NCLT & NCLAT Advisory | Corporate / Tribunal; Insolvency & Restructuring |
| Banking, NBFC & Financial Services Advisory | Banking, RBI & Financial Services |
| Startup & Investment Advisory | Startup Advisory; Investment & Transaction Advisory |
| HR & Employment Advisory | HR, Employment & Labour |
| MSME Advisory & Disputes | Business Strategy; MSME / MSEFC, Udyam / MSME and MSME Arbitration cross-references |
| Arbitration & Conciliation | Arbitration & ADR |
| DRT & DRAT Matters | Banking & Recovery |
| Telecom Disputes Settlement and Appellate Tribunal (TDSAT) | TDSAT; Telecommunications |
| AFT & CAT Advisory Matters | Existing form capabilities retained; absent from workbook |
| RERA & Real Estate Advisory | Real Estate / RERA; RERA and Property Disputes cross-references; existing project capabilities retained |
| GST & Indirect Tax Regulatory Support | Taxation & Compliance; broader tax capabilities stay available within this existing practice |
| Risk, Governance & Forensic Advisory | Risk, Forensics & Investigations |
| ESG & Sustainability Advisory | ESG & Sustainability |
| Cross-Border & International Business Support | Cross-Border, FDI, ODI; India Entry Advisory; International Tax |

The Customs URL remains `/services/litigation-and-dispute-resolution` and TDSAT remains `/services/nclt-and-nclat-matters` to preserve existing links. These pre-existing naming mismatches have not been silently renamed. MSME and RERA groupings cross-reference workbook entries; their complete original parent relationships remain available under the mapped workbook groups.

The shared enquiry form derives all 21 choices and select-to-reveal children from the same portfolio. Individual practice pages expose the full hierarchy through expandable sections. Existing article content is reused; publication dates render only when a real `publishedAt` is supplied.

Run `node scripts/validate-services.cjs` for data, hierarchy and filter checks. Browser checks use `scripts/check-services.cjs`; supply `PLAYWRIGHT_MODULE` if Playwright is installed outside this project. Screenshots are written to ignored `artifacts/services/`.
