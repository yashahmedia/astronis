"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { matchesService } from "@/data/service-search";
import ServiceCard from "./service-card";
import { ExpertiseBanner } from "./hub-sections";
import styles from "./hub.module.css";

const categories = ["All", "Corporate", "Regulatory", "Legal", "Compliance", "Transactions", "International", "Technology", "Risk"];
export default function ServicesExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const matches = services.filter(service => matchesService(service, query, category));
  return <section id="all-services" className={styles.directory} aria-labelledby="services-title"><div className="container">
    <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR SERVICE PORTFOLIO</span><h2 id="services-title">Find the expertise<br />you need.</h2></div><p>Explore our 21 advisory practices.<br />One connected perspective on your business.</p></div>
    <div className={styles.filters}><label htmlFor="hub-service-search">Search by service, regulation or business need</label><input id="hub-service-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try corporate structuring, DPDP, FEMA…" /><div className={styles.filterButtons} aria-label="Filter services">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    <p className={styles.result} role="status">{matches.length} {matches.length === 1 ? "practice" : "practices"} {query || category !== "All" ? "matching your selection" : "working together for your business"}</p>
    {matches.length ? <><div className={styles.grid}>{matches.slice(0, 6).map(service => <ServiceCard key={service.slug} service={service} />)}</div>{!query && category === "All" && <ExpertiseBanner />}<div className={styles.grid}>{matches.slice(6).map(service => <ServiceCard key={service.slug} service={service} />)}</div></> : <div className={styles.empty}><h3>No matching practices</h3><p>Try a broader term or explore the complete portfolio.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
  </div></section>;
}
