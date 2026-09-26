import Icon from "../../_components/icon";
import styles from "./service-template.module.css";

export default function RegulatoryEcosystem({ stages }: { stages: string[] }) {
  return <div className={`${styles.lifecycle} ${styles.regulatoryEcosystem}`} aria-label="Regulatory compliance ecosystem">
    <div className={styles.lifecycleHeading}><span>THE REGULATORY ECOSYSTEM</span><strong>Connected obligations.<br /><em>A structured response.</em></strong></div>
    <div className={styles.regulatoryCore}><Icon name="shield" /><div><small>AN INTEGRATED PERSPECTIVE</small><strong>Regulatory Advisory</strong></div></div>
    <ol>{stages.map((stage, index) => <li key={stage}><span><Icon name={index === 1 || index === 5 ? "shield" : "file"} /></span><strong>{stage}</strong></li>)}</ol>
    <p>Understand obligations. Coordinate action. Maintain oversight.</p>
  </div>;
}
