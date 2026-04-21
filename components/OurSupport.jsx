"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./OurSupport.module.css";

const supportCards = [
  {
    badge: "01",
    category: "Infrastructure",
    title: "STEM + Tinkering + AI + Astrophysics Labs",
    description: "We establish state-of-the-art STEM Labs, Tinkering Labs, and specialized facilities like AI and Astrophysics Labs — even in underserved regions — ensuring quality education reaches every corner.",
    color: "#0f172a",
    glowColor: "rgba(14, 165, 233, 0.4)", // light blue
    image: "/support/1.jpeg"
  },
  {
    badge: "02",
    category: "National Scale",
    title: "Connecting School Education to HEIs",
    description: "In collaboration with IIT Kanpur, we established 150+ RAA laboratories across Delhi and Uttarakhand, conducted capacity-building workshops, and reached 3800+ schools online.",
    color: "#1e3a8a",
    glowColor: "rgba(56, 189, 248, 0.4)", // sky blue
    image: "/support/2.jpeg"
  },
  {
    badge: "03",
    category: "Community",
    title: "Schools as Community Learning Ecosystems",
    description: "We run outreach programs where schools become the center of educational activity for the whole community. Aghaaz Labs enable cluster learning under appointed mentors.",
    color: "#3730a3",
    glowColor: "rgba(99, 102, 241, 0.4)", // indigo
    image: "/support/3.jpeg"
  },
  {
    badge: "04",
    category: "Experiential",
    title: "Child as an Active Learner: Learning by Doing",
    description: "We create hands-on learning that turns theory into real understanding — including night sky observation sessions using advanced telescopes in Astrophysics Labs.",
    color: "#5b21b6",
    glowColor: "rgba(168, 85, 247, 0.4)", // purple
    image: "/support/4.jpeg"
  }
];

function Card({ i, card, progress, totalCards }) {
  const n = totalCards;
  
  // Dedicated reading zone for Card 0 heavily extended so user can read before any animation
  const startDeadZone = 0.35; 
  const endDeadZone = 0.10; 
  const stackCompressionEnd = 1 - endDeadZone;

  const transitionSpace = stackCompressionEnd - startDeadZone; 
  const enterDuration = transitionSpace / (n - 1); 

  const startEnter = startDeadZone + (i - 1) * enterDuration;
  const endEnter = startDeadZone + i * enterDuration;

  const inputRange = [];
  const yOutput = [];
  const scaleOutput = [];
  const rotateXOutput = [];
  const opacityOutput = []; 

  const finalStackOffset = -((n - 1 - i) * 5); // Fan out gap
  const finalScale = 1 - (n - 1 - i) * 0.02; // Almost invisible shrink
  const finalOpacity = 1; // Absolutely 0% dimming for max legibility

  if (i === 0) {
    // Card 0 rests securely allowing user read time, then drops back slowly
    inputRange.push(0, startDeadZone, stackCompressionEnd, 1);
    
    yOutput.push("0vh", "0vh", `${finalStackOffset}vh`, `${finalStackOffset}vh`);
    scaleOutput.push(1, 1, finalScale, finalScale);
    rotateXOutput.push("0deg", "0deg", "0deg", "0deg");
    opacityOutput.push(1, 1, finalOpacity, finalOpacity);
  } else {
    // Phase 1: Waiting below
    inputRange.push(0, startEnter);
    yOutput.push("120vh", "120vh");
    scaleOutput.push(1, 1);
    rotateXOutput.push("8deg", "8deg"); // Subtle lift
    opacityOutput.push(1, 1);
    
    // Phase 2: Enter
    inputRange.push(endEnter);
    yOutput.push("0vh");
    scaleOutput.push(1);
    rotateXOutput.push("0deg");
    opacityOutput.push(1);
    
    // Phase 3: Stack compression behind new cards
    if (i < n - 1) {
      inputRange.push(stackCompressionEnd, 1);
      
      yOutput.push(`${finalStackOffset}vh`, `${finalStackOffset}vh`);
      scaleOutput.push(finalScale, finalScale);
      rotateXOutput.push("0deg", "0deg");
      opacityOutput.push(finalOpacity, finalOpacity);
    } else {
      inputRange.push(1);
      
      yOutput.push("0vh");
      scaleOutput.push(1);
      rotateXOutput.push("0deg");
      opacityOutput.push(1);
    }
  }

  const y = useTransform(progress, inputRange, yOutput);
  const scale = useTransform(progress, inputRange, scaleOutput);
  const rotateX = useTransform(progress, inputRange, rotateXOutput);
  
  // Inverse overlay opacity mapping for darkening
  const overlayOpacity = useTransform(progress, inputRange, opacityOutput.map(op => 1 - op));

  return (
    <motion.div 
      className={styles.cardContainer}
      style={{ 
        y, 
        scale, 
        rotateX, 
        zIndex: i,
        backgroundColor: card.color
      }}
    >
      {/* Dark overlay for depth when stacked */}
      <motion.div 
         className={styles.cardOverlay}
         style={{ opacity: overlayOpacity }}
      />

      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
           <div className={styles.cardHeader}>
             <span className={styles.badge}>{card.badge}</span>
             <span className={styles.category}>{card.category}</span>
           </div>
           <h3 className={styles.cardTitle}>{card.title}</h3>
           <p className={styles.cardText}>{card.description}</p>
        </div>
        <div className={styles.cardGraphic}>
           {card.image ? (
              <img src={card.image} alt={card.title} className={styles.supportImage} />
           ) : (
              <div className={styles.graphicPlaceholder}>
                 <div className={styles.abstractShape} style={{ background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 60%)`}} />
              </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}

export default function OurSupport() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className={styles.scrollSection} id="support-section">
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            What We <span className={styles.highlight}>Do</span>
          </h2>
          <h3 className={styles.subtextHeading}>Structure, mentorship & guidance</h3>
          <p className={styles.subtitle}>
            Sarvshixiit is dedicated to transforming education through innovative STEM initiatives. We build hands-on learning ecosystems in underserved regions — strengthening fundamentals, developing problem-solving, and enabling collaborative learning at scale.
          </p>
        </div>
      </div>

      <div className={styles.stickyStage}>
        {supportCards.map((card, i) => (
          <Card 
            key={i} 
            i={i} 
            card={card} 
            progress={scrollYProgress}
            totalCards={supportCards.length}
          />
        ))}
      </div>
    </section>
  );
}