"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import styles from "./page.module.css";

const Loader = dynamic(() => import("../components/Loader"), { 
  ssr: false,
  loading: () => <div className={styles.systemBootingOrb}></div>
});
const CursorOrbit = dynamic(() => import("../components/CursorOrbit"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Mentors = dynamic(() => import("../components/Mentors"), { ssr: false });
const BackgroundStars = dynamic(() => import("../components/BackgroundStars"), { ssr: false });
const Reach = dynamic(() => import("../components/Reach"), { ssr: false });
const OurSupport = dynamic(() => import("../components/OurSupport"), { ssr: false });
const Contact = dynamic(() => import("../components/Contact"), { ssr: false });

export default function Home() {
  const [stage, setStage] = useState("loading"); // 'loading', 'transitioning', 'hero'

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("preloaderShown")) {
      setStage("hero");
    }
  }, []);

  const handleGlobeReachRight = () => {
    if (stage === "loading") {
      setStage("transitioning");
      setTimeout(() => {
        setStage("hero");
        sessionStorage.setItem("preloaderShown", "true");
      }, 800);
    }
  };

  return (
    <main className={styles.container}>
      <BackgroundStars />
      <Navbar show={stage === "hero"} />
      <CursorOrbit show={stage === "hero"} />
      <div className={styles.heroFold}>
        <Loader onGlobeReachRight={handleGlobeReachRight} skipIntro={stage === "hero"} />
        <Hero showHero={stage === "transitioning" || stage === "hero"} showLogo={stage === "transitioning" || stage === "hero"} />
      </div>
      {stage === "hero" && (
        <>
          <Mentors />
          <OurSupport />
          <Reach />
          <Contact />
        </>
      )}
    </main>
  );
}
