"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SpotlightTiltCard.module.css";

export default function SpotlightTiltCard({ id, name, role, shortBio, tags, imagePath, onClick }) {
  const wrapperRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleInteraction = (clientX, clientY) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
  
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={wrapperRef}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onClick={() => onClick(id)}
    >
      <motion.div 
        layoutId={`mentor-${id}`}
        animate={{ 
            rotateX: rotation.x, 
            rotateY: rotation.y 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${styles.card} ${isHovering ? styles.hovering : ""}`}
      >
        <div 
           className={styles.spotlight} 
           style={{
             "--mouse-x": `${mousePos.x}px`,
             "--mouse-y": `${mousePos.y}px`
           }}
        />
        
        <div className={styles.content}>
          {imagePath ? (
            <motion.img layoutId={`avatar-${id}`} src={imagePath} alt={name} className={styles.avatar} />
          ) : (
            <motion.div layoutId={`avatar-${id}`} className={styles.avatarPlaceholder} />
          )}
          
          <div className={styles.infoBlock}>
            <motion.h3 layoutId={`name-${id}`} className={styles.name}>{name}</motion.h3>
            <motion.p layoutId={`role-${id}`} className={styles.role}>{role}</motion.p>
            {shortBio && (
              <motion.p layoutId={`desc-${id}`} className={styles.shortBio}>{shortBio}</motion.p>
            )}
          </div>
          
          <div className={styles.tags}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
