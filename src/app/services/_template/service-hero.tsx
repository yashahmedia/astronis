import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { practicePath, type ServicePractice, type DetailedServiceGroup } from "@/data/service-detail-types";
import Breadcrumbs from "./breadcrumbs";
import styles from "./service-template.module.css";

export function ServiceButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`${styles.button} ${secondary ? styles.secondary : ""}`}>{children}<Icon name="arrow" /></Link>;
}

export default function ServiceHero({ practice, group }: { practice: ServicePractice; group?: DetailedServiceGroup }) {
  const badges = group?.badges || practice.badges;
  return <section className={`${styles.hero} ${group ? styles.detailHero : ""}`}>
    {group && <Image src={group.image} alt="" fill preload sizes="100vw" className={styles.heroImage} />}
    <div className="container">
      <Breadcrumbs items={[{title:"Home",href:"/"},{title:"Services",href:"/services"},{title:practice.title,...(group ? {href:practicePath(practice)} : {})},...(group ? [{title:group.title}] : [])]} />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{group ? practice.title : "STRUCTURE. DIRECTION. CONTINUITY."}</span>
          <h1>{group?.title || practice.title}</h1>
          {!group && <p className={styles.heroStatement}>{practice.heroStatement}</p>}
          <p>{group?.description || practice.description}</p>
          <div className={styles.actions}><ServiceButton href="#enquiry">Speak With an Advisor</ServiceButton><ServiceButton href={group ? `#${group.children[0].slug}` : "#service-groups"} secondary>{group ? "Explore Services" : "Explore Our Capabilities"}</ServiceButton></div>
        </div>
        {!group && <div className={styles.lifecycle} aria-label="Business lifecycle">
          <div className={styles.lifecycleHeading}><span>THE BUSINESS LIFECYCLE</span><strong>Connected decisions.<br /><em>Lasting foundations.</em></strong></div>
          <ol>{practice.lifecycle.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2,"0")}</span><strong>{stage}</strong><Icon name="arrow" /></li>)}</ol>
          <p>One advisory perspective, through every stage.</p>
        </div>}
      </div>
      <div className={styles.badges}>{badges.map(badge => <span key={badge}>{badge}</span>)}</div>
    </div>
  </section>;
}
