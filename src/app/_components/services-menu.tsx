"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { practices } from "@/content/site";
import Icon from "./icon";
import styles from "./services-menu.module.css";
import { isRouteActive } from "./navigation-state";

const groups = [
  { title: "Corporate & Business", caption: "Build · Grow · Transform", icon: "building", slugs: ["corporate-and-commercial-advisory", "business-advisory-and-consulting", "banking-nbfc-and-financial-services-advisory", "startup-and-investment-advisory", "intellectual-property-rights", "rera-and-real-estate-advisory"] },
  { title: "Regulatory & Cross-Border", caption: "Comply · Navigate · Expand", icon: "shield", slugs: ["regulatory-and-compliance", "licensing-and-registrations", "fema-fdi-and-foreign-exchange-advisory", "gst-and-indirect-tax-regulatory-support", "litigation-and-dispute-resolution", "cross-border-and-international-business-support"] },
  { title: "Disputes & Tribunals", caption: "Resolve · Represent · Protect", icon: "scale", slugs: ["nclt-and-nclat-advisory", "msme-advisory-and-disputes", "arbitration-and-conciliation", "drt-and-drat-matters", "nclt-and-nclat-matters", "aft-and-cat-advisory-matters"] },
  { title: "People, Risk & Sustainability", caption: "Empower · Assure · Create Impact", icon: "people", slugs: ["hr-and-employment-advisory", "risk-governance-and-forensic-advisory", "esg-and-sustainability-advisory"] },
] as const;

const bySlug = new Map(practices.map((practice) => [practice.slug, practice]));

export default function ServicesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const term = query.trim().toLowerCase();
  const matches = (practice: (typeof practices)[number]) => `${practice.title} ${practice.description}`.toLowerCase().includes(term);
  const count = practices.filter(matches).length;

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    
    <div className={styles.body}>
      <div className={styles.columns}>
        {groups.map((group) => <section className={styles.column} key={group.title} aria-label={group.title}>
          <div className={styles.groupHeading}><Icon name={group.icon} /><div><h3>{group.title}</h3><p>{group.caption}</p></div></div>
          <div className={styles.links}>{group.slugs.map((slug) => {
            const practice = bySlug.get(slug);
            if (!practice || !matches(practice)) return null;
            const href = `/services/${practice.slug}`;
            return <Link href={href} key={slug} onClick={onNavigate} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span><strong>{practice.title}</strong><small>{practice.description}</small></span><Icon name="arrow" /></Link>;
          })}</div>
          {group.title === "People, Risk & Sustainability" && !term && <Link className={styles.model} href="/services" onClick={onNavigate}><span>Our integrated model</span><strong>Corporate × Regulatory<br />Legal × Business Advisory</strong><small>Connected advice for complex business decisions.</small><em>Discover our approach <Icon name="arrow" /></em></Link>}
        </section>)}
        {term && <p className={styles.result} role="status">{count ? `${count} matching services` : "No matching services. Try another keyword."}</p>}
      </div>

      <aside className={styles.sidebar} aria-label="Find the right service">
        <label htmlFor="service-menu-search">Find the right service</label><p>Search by service, issue, regulator or business need.</p>
        <div className={styles.search}><Icon name="search" /><input id="service-menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services..." /></div>
        <div className={styles.quickLinks}>
          <Link href="/services" onClick={onNavigate} className={isRouteActive(pathname, "/services") ? "active-submenu-item" : undefined}><Icon name="file" />Explore All Services<Icon name="arrow" /></Link>
          <Link href="/insights" onClick={onNavigate} className={isRouteActive(pathname, "/insights") ? "active-submenu-item" : undefined}><Icon name="bulb" />Service Insights<Icon name="arrow" /></Link>
          <Link href="/insights/legal-updates" onClick={onNavigate} className={isRouteActive(pathname, "/insights/legal-updates") ? "active-submenu-item" : undefined}><Icon name="document" />Regulatory Updates<Icon name="arrow" /></Link>
          <Link href="/professionals" onClick={onNavigate} className={isRouteActive(pathname, "/professionals") ? "active-submenu-item" : undefined}><Icon name="people" />Find a Professional<Icon name="arrow" /></Link>
          <Link href="/contact" onClick={onNavigate} className={isRouteActive(pathname, "/contact") ? "active-submenu-item" : undefined}><Icon name="mail" />Discuss Your Requirement<Icon name="arrow" /></Link>
        </div>
        <div className={styles.insight}><span>Featured perspective</span><strong>Practical advice for a changing regulatory landscape.</strong><Link href="/insights" onClick={onNavigate}>Explore insights <Icon name="arrow" /></Link></div>
      </aside>
    </div>

    <div className={styles.footer}>
      <Link href="/services" onClick={onNavigate} className={isRouteActive(pathname, "/services") ? "active-submenu-item" : undefined}><Icon name="file" /><span><strong>Explore All Services</strong><small>Complete service portfolio</small></span></Link>
      <Link href="/services" onClick={onNavigate} className={isRouteActive(pathname, "/services") ? "active-submenu-item" : undefined}><Icon name="search" /><span><strong>Browse by Business Need</strong><small>Find the right support</small></span></Link>
      <Link href="/industries" onClick={onNavigate} className={isRouteActive(pathname, "/industries") ? "active-submenu-item" : undefined}><Icon name="building" /><span><strong>Browse Industries</strong><small>Sector-specific advice</small></span></Link>
      <Link href="/global-presence" onClick={onNavigate} className={isRouteActive(pathname, "/global-presence") ? "active-submenu-item" : undefined}><Icon name="globe" /><span><strong>Global Capabilities</strong><small>Cross-border expertise</small></span></Link>
      <Link href="/insights" onClick={onNavigate} className={isRouteActive(pathname, "/insights") ? "active-submenu-item" : undefined}><Icon name="bulb" /><span><strong>Service Insights</strong><small>Articles and updates</small></span></Link>
      <Link className={styles.cta} href="/contact" onClick={onNavigate}>Discuss Your Requirement <Icon name="arrow" /></Link>
    </div>
  </div>;
}
