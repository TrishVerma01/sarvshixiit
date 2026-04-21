"use client";

import { useEffect, useRef } from "react";

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // pure rendering
    let animationFrameId;

    const numStars = 1500; // Significantly more stars for denser field
    const stars = [];
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    class Star {
      constructor() {
        this.x = (Math.random() - 0.5) * w * 2;
        this.y = (Math.random() - 0.5) * h * 2;
        this.z = Math.random() * w; // depth scale bound to screen width
        this.pz = this.z; // previous depth
      }

      update(speed) {
        this.z -= speed;
        // If star passes the camera, reset it far away
        if (this.z < 1) {
          this.z = w;
          this.x = (Math.random() - 0.5) * w * 2;
          this.y = (Math.random() - 0.5) * h * 2;
          this.pz = this.z; 
        }
      }

      draw() {
        // Perspective projection formula
        const x = (this.x / this.z) * w + w / 2;
        const y = (this.y / this.z) * w + h / 2;
        
        const px = (this.x / this.pz) * w + w / 2;
        const py = (this.y / this.pz) * w + h / 2;
        
        this.pz = this.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);

        // Opacity gradient: more visible natively
        const opacity = Math.max(0.2, 1 - this.z / w); // Ensure they stay visible from afar
        
        // Pure bright white with slight cyan blue tint to match portfolio
        ctx.strokeStyle = `rgba(220, 240, 255, ${opacity * 0.8})`;
        ctx.lineWidth = Math.max(0.8, (1 - this.z / w) * 3); // Slightly thicker baseline dots
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    // Initialize stars array
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    const baseSpeed = 0.8; // slightly faster ambient drifting
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      
      // Accumulate velocity, cap heavily so it doesn't break physics math
      scrollSpeed = Math.min(scrollSpeed + delta * 0.2, 45); 
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      // Semi-transparent deep navy fade to draw beautiful light-trails naturally
      ctx.fillStyle = "rgba(11, 18, 32, 0.4)"; 
      ctx.fillRect(0, 0, w, h);

      // Dampen acceleration back down to 0 via physics tension/friction
      scrollSpeed *= 0.92;
      
      const currentSpeed = baseSpeed + scrollSpeed;

      stars.forEach(star => {
        star.update(currentSpeed);
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
