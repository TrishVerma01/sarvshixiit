"use client";

import { Info, Globe, Rocket, Users, Target, Image, Mail } from "lucide-react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

const navData = [
  {
    title: "About Us",
    icon: Info,
    targetId: "hero-section"
  },
  {
    title: "Architects of Learning",
    icon: Users,
    targetId: "mentors-section"
  },
  {
    title: "Our Support",
    icon: Target,
    targetId: "support-section"
  },
  {
    title: "Presence",
    icon: Globe,
    targetId: "presence-section"
  },
  {
    title: "Projects",
    icon: Rocket,
    href: "/projects"
  },
  {
    title: "Gallery",
    icon: Image,
    href: "/gallery"
  },
  {
    title: "Contact",
    icon: Mail,
    href: "mailto:Sarvshixiit@gmail.com"
  }
];

export default function Navbar({ show }) {
  const router = useRouter();
  
  return (
    <nav className={`${styles.navContainer} ${show ? styles.visible : ""}`}>
      <div className={styles.navPill}>
        {navData.map((section, idx) => (
          <div 
            key={idx} 
            className={styles.navItem}
            onClick={() => {
              if (section.targetId) {
                // Determine if we are heavily off the home page
                if (window.location.pathname !== "/") {
                  router.push("/#" + section.targetId);
                } else {
                  document.getElementById(section.targetId)?.scrollIntoView({ behavior: 'smooth' });
                }
              } else if (section.href) {
                if (section.href.startsWith("mailto:")) {
                  window.location.href = section.href;
                } else {
                  router.push(section.href);
                }
              }
            }}
          >
            <section.icon className={styles.icon} />
            <span className={styles.navLabel}>{section.title}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
