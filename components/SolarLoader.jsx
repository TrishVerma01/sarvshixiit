"use client";

import React from "react";
import styles from "./SolarLoader.module.css";

export default function SolarLoader() {
  return (
    <div className={styles.solarContainer}>
      <div className={styles.solarSystem}>
        {/* Central glowing sun */}
        <div className={styles.sun} />
        
        {/* Orbital rings and planets */}
        <div className={`${styles.orbit} ${styles.orbit1}`}>
          <div className={`${styles.planet} ${styles.planet1}`} />
        </div>
        
        <div className={`${styles.orbit} ${styles.orbit2}`}>
          <div className={`${styles.planet} ${styles.planet2}`} />
        </div>
        
        <div className={`${styles.orbit} ${styles.orbit3}`}>
          <div className={`${styles.planet} ${styles.planet3}`} />
        </div>
      </div>
      
      <p className={styles.loadingText}>Loading System...</p>
    </div>
  );
}
