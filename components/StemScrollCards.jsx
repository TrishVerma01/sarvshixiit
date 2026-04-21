"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styles from "./StemScrollCards.module.css";

const cards = [
  {
    kicker: "STEM INFRA",
    title: "STEM + Tinkering + AI + Astrophysics Labs",
    body: "We establish state-of-the-art STEM Labs, Tinkering Labs, and specialized facilities like AI and Astrophysics Labs - even in challenging terrains and underserved regions - ensuring quality education reaches every corner of the country.",
    stat: "Labs for every terrain",
    accent: "green",
  },
  {
    kicker: "NATIONAL SCALE",
    title: "Connecting School Education to HEIs",
    body: "In collaboration with IIT Kanpur, we established 150+ RAA laboratories across Delhi and Uttarakhand, conducted capacity-building workshops, and reached 162 schools offline + 3800+ schools online - training 324 teachers offline and 22,000+ teachers online.",
    stat: "22,000+ teachers online",
    accent: "blue",
  },
  {
    kicker: "COMMUNITY",
    title: "Schools as Community Learning Ecosystems",
    body: "We run outreach programs where schools become the center of educational activity for the whole community. Aghaaz Labs enable cluster learning under appointed mentors, supported by education departments - welcoming learners beyond the classroom.",
    stat: "Cluster learning",
    accent: "rose",
  },
  {
    kicker: "EXPERIENTIAL",
    title: "Child as an Active Learner: Learning by Doing",
    body: "We create hands-on learning that turns theory into real understanding, including night sky observation sessions using advanced telescopes in Astrophysics Labs. Students observe celestial objects and experience science directly, building curiosity and confidence.",
    stat: "Learning by doing",
    accent: "gold",
  },
];

const principles = [
  {
    label: "Mission",
    text: "Empower the next generation of innovators through accessible, hands-on STEM education that inspires curiosity, creativity, and lifelong learning.",
  },
  {
    label: "Vision",
    text: "Become a global leader in STEM education, enabling learners from all backgrounds to become problem-solvers, critical thinkers, and pioneers in technology and science.",
  },
];

function ScrollCard({ card, index, total, progress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const y = useTransform(progress, [start, end], [72, -14]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);
  const opacity = useTransform(progress, [start, start + 0.08, end], [0.55, 1, 1]);

  return (
    <motion.article
      className={`${styles.card} ${styles[card.accent]}`}
      style={{ y, scale, opacity, zIndex: index + 1 }}
    >
      <div className={styles.cardTopline}>
        <span>{card.kicker}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <div className={styles.cardFooter}>
        <span>{card.stat}</span>
      </div>
    </motion.article>
  );
}

export default function StemScrollCards() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section className={styles.section} ref={sectionRef} id="stem-impact">
      <div className={styles.stickyFrame}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>STEM for every learner</span>
          <h2>Labs, mentors, and sky-facing curiosity.</h2>
          <p>
            From school labs to community learning clusters, Sarvshixiiit builds
            the infrastructure and experiences that help learners explore,
            question, and create.
          </p>
          <div className={styles.progressShell} aria-hidden="true">
            <motion.span style={{ scaleX: railScale }} />
          </div>
        </motion.div>

        <div className={styles.stackWrap}>
          <div className={styles.orbitVisual} aria-hidden="true">
            <Image src="/earth.jpg" alt="" fill sizes="310px" priority={false} />
          </div>
          <div className={styles.cardsStack}>
            {cards.map((card, index) => (
              <ScrollCard
                key={card.kicker}
                card={card}
                index={index}
                total={cards.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className={styles.principles}>
          {principles.map((item) => (
            <motion.div
              className={styles.principle}
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>{item.label}</span>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
