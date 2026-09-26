"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "../../_components/icon";
import styles from "./service-template.module.css";

type Item = { id: string; title: string; icon?: string };
export default function SectionNavigation({ items, title, variant = "sidebar" }: { items: Item[]; title: string; variant?: "sidebar" | "bar" }) {
  const [active, setActive] = useState(items[0]?.id || "");
  const selectId = useId();
  const navigationRef = useRef<HTMLElement>(null);

  function navigate(id: string, updateHistory = true) {
    const target = document.getElementById(id);
    if (!target) return;
    const navigationHeight = variant === "bar" || window.matchMedia("(max-width: 767px)").matches ? (navigationRef.current?.getBoundingClientRect().height || 80) : 0;
    const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height || 120) + navigationHeight + 24;
    if (updateHistory) window.history.pushState(null, "", `#${id}`);
    setActive(id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior: reducedMotion || !updateHistory ? "instant" : "smooth" });
    if (updateHistory) target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const nodes = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    const template = nodes[0]?.closest<HTMLElement>("[data-service-template]");
    const header = document.querySelector(".site-header");
    let frame = 0;
    let initialFrame = 0;
    const offset = () => (header?.getBoundingClientRect().height || 120) + (variant === "bar" || window.matchMedia("(max-width: 767px)").matches ? (navigationRef.current?.getBoundingClientRect().height || 80) : 0) + 24;
    const update = () => {
      frame = 0;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= offset() + 50) current = node;
        else break;
      }
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(schedule, { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.1] });
    nodes.forEach(node => observer.observe(node));
    const resize = new ResizeObserver(() => {
      template?.style.setProperty("--service-header-offset", `${(header?.getBoundingClientRect().height || 120) + 20}px`);
      schedule();
    });
    if (header) resize.observe(header);
    const restoreHash = () => {
      let hash: string;
      try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = nodes.find(node => node.id === hash);
      if (target) {
        window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset(), behavior: "instant" });
        setActive(target.id);
      }
    };
    // Run after the shared page transition and Next's initial hash restoration.
    initialFrame = requestAnimationFrame(() => { initialFrame = requestAnimationFrame(restoreHash); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", restoreHash);
    window.addEventListener("popstate", restoreHash);
    schedule();
    return () => {
      observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("hashchange", restoreHash); window.removeEventListener("popstate", restoreHash);
    };
  }, [items, variant]);

  return <nav ref={navigationRef} className={variant === "sidebar" ? styles.sidebarNav : styles.sectionNav} aria-label={title}>
    <div className={styles.navDesktop}>
      <p className={styles.navTitle}>{title}</p>
      <ol>{items.map((item, index) => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(item.id); }}>
        {variant === "bar" ? <><span className={styles.navIcon}><Icon name={item.icon || "file"} /></span><span className={styles.navItemText}><small>0{index+1} / EXPLORE</small><strong>{item.title}</strong></span><span className={styles.navArrow} aria-hidden="true">↗</span></> : <><span>{String(index + 1).padStart(2, "0")}</span>{item.title}<span aria-hidden="true">↗</span></>}
      </a></li>)}</ol>
    </div>
    <div className={styles.navMobile}><label htmlFor={selectId}>Jump to a service</label><select id={selectId} value={active} onChange={event => navigate(event.target.value)}>{items.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select></div>
  </nav>;
}
