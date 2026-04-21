"use client";

import styles from "./ContentSection.module.css";
import TiltCard from "./TiltCard";

export default function ContentSection() {
  const cards = [
    { title: "Founded", body: "IITK ecosystem" },
    { title: "Focus", body: "STEM + Guidance" },
    { title: "Mode", body: "Hybrid Learning" }
  ];

  return (
    <section className={styles.contentSection}>
      <div className={styles.missionVisionBox}>
        <div className={styles.mission}>
          <h2>Mission</h2>
          <p>
            Empower the next generation of innovators through accessible, hands-on STEM education that inspires curiosity, creativity, and lifelong learning.
          </p>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.vision}>
          <h2>Vision</h2>
          <p>
            Become a global leader in STEM education, enabling learners from all backgrounds to become problem-solvers, critical thinkers, and pioneers in technology and science.
          </p>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {cards.map((card, idx) => (
          <TiltCard key={idx} title={card.title} body={card.body} />
        ))}
      </div>
    </section>
  );
}
