"use client";

import dynamic from "next/dynamic";
import styles from "../page.module.css";

const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const BackgroundStars = dynamic(() => import("../../components/BackgroundStars"), { ssr: false });
const HoverPreview = dynamic(() => import("../../components/HoverPreview"), { ssr: false });
const CursorOrbit = dynamic(() => import("../../components/CursorOrbit"), { ssr: false });

export default function ProjectsPage() {
  return (
    <main className={styles.container}>
      <BackgroundStars />
      <Navbar show={true} />
      <CursorOrbit show={true} />
      
      <div style={{ position: "relative", zIndex: 10, width: "100%", paddingBottom: "2rem" }}>
        <HoverPreview />
      </div>
    </main>
  );
}
