"use client";

import { useRef, useState } from "react";
import styles from "./TiltCard.module.css";

export default function TiltCard({ title, body, small }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleInteraction = (clientX, clientY) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Increased tilt angle for highly visible physics
    const rotateX = ((y - centerY) / centerY) * -25; 
    const rotateY = ((x - centerX) / centerX) * 25;

    setRotation({ x: rotateX, y: rotateY });
  }

  const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
  
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 }); // reset safely
  };

  return (
    <div 
      ref={wrapperRef}
      className={`${styles.tiltCardWrapper} ${small ? styles.smallWrapper : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div 
        ref={cardRef} 
        className={`${styles.tiltCard} ${isHovering ? styles.hovering : ""} ${small ? styles.smallCard : ""}`}
        style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isHovering ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
        }}
      >
        <h3 className={`${styles.title} ${small ? styles.titleSmall : ""}`}>{title}</h3>
        <p className={`${styles.body} ${small ? styles.bodySmall : ""}`}>{body}</p>
      </div>
    </div>
  );
}
