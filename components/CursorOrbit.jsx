"use client";

import { useEffect, useRef } from "react";

export default function CursorOrbit({ show }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on small screens
    const isMobile = window.innerWidth <= 960;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const colors = ["#0ea5e9", "#1e3a8a", "#0284c7", "#38bdf8", "#ffffff"]; 
    const particles = [];
    const gridSize = 6; // Significantly smaller, sleeker pixels

    let mouse = { x: -100, y: -100 };
    let trailingMouse = { x: -100, y: -100 };
    let lastSpawn = { x: -100, y: -100 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Pixel {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.age = 0;
        this.maxAge = 35; // Smoother, slightly shorter lifespan
        this.size = gridSize;
      }

      update() {
        this.age++;
      }

      draw() {
        if (this.age >= this.maxAge) return;
        const progress = this.age / this.maxAge;
        
        // Shrink towards center
        const currentSize = this.size * Math.max(0, 1 - progress);
        const offset = (this.size - currentSize) / 2;
        
        ctx.globalAlpha = Math.max(0, 1 - progress);
        ctx.fillStyle = this.color;
        // Draw crisp pixels
        ctx.fillRect(this.x + offset, this.y + offset, currentSize, currentSize);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp trailing mouse for smooth line interpolation
      trailingMouse.x += (mouse.x - trailingMouse.x) * 0.5;
      trailingMouse.y += (mouse.y - trailingMouse.y) * 0.5;

      // Snap trailing position to grid
      const gridX = Math.round(trailingMouse.x / gridSize) * gridSize;
      const gridY = Math.round(trailingMouse.y / gridSize) * gridSize;

      // Spawn pixel if we entered a new grid cell 
      if ((gridX !== lastSpawn.x || gridY !== lastSpawn.y) && trailingMouse.x !== -100) {
         particles.push(new Pixel(gridX, gridY, colors[Math.floor(Math.random() * colors.length)]));
         lastSpawn.x = gridX;
         lastSpawn.y = gridY;
      }

      // Update and draw all active pixels
      for (let i = particles.length - 1; i >= 0; i--) {
         particles[i].update();
         if (particles[i].age >= particles[i].maxAge) {
             particles.splice(i, 1);
         } else {
             particles[i].draw();
         }
      }

      // Active cursor head (exact mouse pos pixel)
      if (mouse.x !== -100) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(mouse.x - gridSize/2, mouse.y - gridSize/2, gridSize, gridSize);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
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
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: show ? 1 : 0,
        transition: "opacity 1.5s ease-in-out",
      }}
    />
  );
}
