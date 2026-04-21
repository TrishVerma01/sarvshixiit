"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./HoverPreview.module.css";

const items = [
  {
    name: "Aghaaz Initiative",
    image: "/aaghaz.jpeg",
    link: "/projects/aghaaz",
  },
  {
    name: "Uttarakhand ATL Programme",
    image: "/uttrakhand atl.jpeg",
    link: "/projects/uttarakhand",
  },
  {
    name: "Assistance in establishing Sathee Kendra",
    image: "/sathee.jpeg",
    link: "/projects/sathee",
  },
  {
    name: "RAA Labs / Atal Tinkering Labs",
    image: "/raa.jpeg",
    link: "/projects/raa",
  },
  {
    name: "Kerala State Officials Programme",
    image: "/kerala.jpeg",
    link: "/projects/kerala",
  },
  {
    name: "AI Lab Initiative",
    image: "/ai.jpeg",
    link: "/projects/ai",
  },
  {
    name: "Arunachal Pradesh Exposure Programme",
    image: "/arunachal.jpeg",
    link: "/projects/arunachal",
  },
];

const getClipPathStyles = (index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const x1 = (col * 100) / 3;
  const y1 = (row * 100) / 3;
  const x2 = ((col + 1) * 100) / 3;
  const y2 = ((row + 1) * 100) / 3;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  return {
    hidden: `polygon(${cx}% ${cy}%, ${cx}% ${cy}%, ${cx}% ${cy}%, ${cx}% ${cy}%)`,
    visible: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`
  };
};

const parentVariants = {
  hidden: { zIndex: 2 },
  visible: { zIndex: 2 },
  exit: { zIndex: 1, opacity: 1, transition: { duration: 1.0 } }
};

const sliceVariants = {
  hidden: (i) => ({
    clipPath: getClipPathStyles(i).hidden,
  }),
  visible: (i) => ({
    clipPath: getClipPathStyles(i).visible,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function HoverPreview() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects <span className={styles.highlight}>&amp; Events</span></h1>
        <p className={styles.subtitle}>
           Explore our ground-level initiatives and deep dive into the impact we create.
        </p>
      </div>

      <div className={styles.flexLayout}>
        {/* LEFT SIDE: Scrollable List */}
        <div className={styles.leftColumn}>
          <div className={styles.listWrapper}>
            {items.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => router.push(item.link)}
                className={`${styles.listItem} ${active === i ? styles.activeItem : styles.inactiveItem}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Sticky Preview */}
        <div className={styles.rightColumn}>
          <div className={styles.stickyWindow}>
            
            <AnimatePresence>
              <motion.div 
                key={active} 
                className={styles.imageGridWrapper}
                variants={parentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Fallback image detection layer */}
                <img 
                    src={items[active].image} 
                    style={{display: 'none'}} 
                    onError={(e) => {
                        e.target.parentElement.classList.add(styles.imageFallbackActive);
                    }}
                    alt={items[active].name}
                />

                {/* 9 Animated Slices */}
                {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={sliceVariants}
                      className={styles.absoluteSlice}
                      style={{ 
                          backgroundImage: `url('${items[active].image}')`
                      }}
                    />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Fallback Layout */}
            <div className={styles.fallbackContent}>
               <h3>Preview Image Missing</h3>
               <p>Add {items[active].image} in public folder</p>
            </div>

            <div className={styles.imageOverlay} />
          </div>
        </div>
      </div>
    </section>
  );
}