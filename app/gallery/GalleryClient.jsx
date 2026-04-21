"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Gallery.module.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const CursorOrbit = dynamic(() => import("../../components/CursorOrbit"), { ssr: false });

export default function GalleryClient({ initialData }) {
    const [activeTag, setActiveTag] = useState("All");
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    const categories = ["All", ...Array.from(new Set(initialData.map(d => d.category)))];

    const filteredData = activeTag === "All" ? initialData : initialData.filter(d => d.category === activeTag);
    const activePhoto = filteredData[activeIndex] || filteredData[0] || initialData[0];

    const handleThumbnailClick = (photo) => {
         const idx = filteredData.findIndex(p => p.id === photo.id);
         if(idx !== -1) setActiveIndex(idx);
    };

    const handleScroll = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    // Auto-Slideshow Logic
    useEffect(() => {
        if (filteredData.length <= 1) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % filteredData.length);
        }, 4000); // Advances every 4 seconds

        return () => clearInterval(interval);
    }, [filteredData.length, activeIndex]);

    // Keep active thumbnail centered
    useEffect(() => {
        if (scrollRef.current) {
            const itemWidth = window.innerWidth <= 768 ? 116 : 176; // Thumbnail width + gap
            const scrollTarget = (activeIndex * itemWidth) - (scrollRef.current.offsetWidth / 2) + (itemWidth / 2);
            
            scrollRef.current.scrollTo({
                left: scrollTarget,
                behavior: "smooth"
            });
        }
    }, [activeIndex]);

    return (
        <main className={styles.container}>
             <Navbar show={true} />
             <CursorOrbit show={true} />

             {/* Background Blur Overlay for Kunumi cinematic depth */}
             <AnimatePresence>
                 {activePhoto && (
                     <motion.div 
                        key={activePhoto.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className={styles.ambientBackground}
                        style={{ backgroundImage: `url('${activePhoto.src}')` }}
                     />
                 )}
             </AnimatePresence>

             <div className={styles.mainLayout}>

                 <div className={styles.centerStage}>
                     <AnimatePresence mode="wait">
                         {activePhoto && (
                             <motion.div 
                                 key={activePhoto.id}
                                 initial={{ opacity: 0, scale: 0.85, y: 40, filter: "blur(15px)" }}
                                 animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                 exit={{ opacity: 0, scale: 1.1, y: -20, filter: "blur(15px)" }}
                                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                 className={styles.activeImageWrapper}
                             >
                                 <motion.img 
                                     src={activePhoto.src} 
                                     alt={activePhoto.category} 
                                     className={styles.activeImage}
                                     initial={{ scale: 1.2 }}
                                     animate={{ scale: 1 }}
                                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                 />
                                 
                                 {/* Glassmorphic Metadata Tag */}
                                 <motion.div 
                                     className={styles.metaCard}
                                     initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                     transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                 >
                                     <span className={styles.metaLocation}>{activePhoto.category}</span>
                                 </motion.div>
                             </motion.div>
                         )}
                     </AnimatePresence>
                 </div>

                 {/* Kunumi Bottom Timeline slider */}
                 <div className={styles.bottomDock}>
                      <div className={styles.categoryRow}>
                          {categories.map((cat) => (
                              <button 
                                 key={cat}
                                 onClick={() => { setActiveTag(cat); setActiveIndex(0); }}
                                 className={`${styles.filterBtn} ${activeTag === cat ? styles.filterActive : ""}`}
                              >
                                  {cat}
                              </button>
                          ))}
                      </div>

                      <div 
                          className={styles.timelineScroll} 
                          ref={scrollRef} 
                          onWheel={handleScroll}
                      >
                          {filteredData.map((photo) => (
                              <div 
                                 key={photo.id}
                                 onClick={() => handleThumbnailClick(photo)}
                                 className={`${styles.thumbnail} ${activePhoto?.id === photo.id ? styles.thumbnailActive : ""}`}
                              >
                                  <img src={photo.src} alt={photo.category} />
                              </div>
                          ))}
                      </div>
                 </div>

             </div>
        </main>
    );
}
