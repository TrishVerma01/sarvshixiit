"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function GlobeFallback({ skipIntro }) {
  const { viewport } = useThree();
  const isMobile = window.innerWidth <= 600;
  const targetX = isMobile ? 0 : viewport.width * 0.28;
  const targetYBase = isMobile ? viewport.height * 0.225 : 0;
  const targetY = targetYBase + viewport.height * 0.035;
  
  return (
    <mesh 
      position={skipIntro ? [targetX, targetY, 0] : [0, 0, 0]} 
      scale={skipIntro ? [0.16, 0.16, 0.16] : [0.001, 0.001, 0.001]}
    >
      <sphereGeometry args={[1.5, 24, 24]} />
      <meshBasicMaterial color="#0ea5e9" />
    </mesh>
  );
}

function RotatingGlobe({ onComplete, skipIntro }) {
  const globeRef = useRef();
  const matRef = useRef();
  const time = useRef(0);
  const texture = useTexture("/earth.jpg");
  const notified = useRef(false);

  useFrame((state, delta) => {
    const { viewport } = state;
    time.current += delta;
    
    if (globeRef.current) {
      // 1. Slow, elegant rotation on Y-axis, combined with real Earth axial tilt (23.5 degrees)
      globeRef.current.rotation.z = 0.41; // 23.5 degree axial tilt
      globeRef.current.rotation.y += delta * 0.35; // slightly faster for majestic feeling
      
      // 2. Either skip intro or wait 2 seconds, then align with logo
      if (skipIntro || time.current > 2.0) {
        
        // Instant snap or lerp scale
        if (skipIntro) {
          globeRef.current.scale.set(0.16, 0.16, 0.16);
        } else {
          globeRef.current.scale.lerp(new THREE.Vector3(0.16, 0.16, 0.16), 0.05);
        }
        
        // Responsive alignment synchronizing with CSS split screen/mobile breakpoints (<= 600px)
        const isMobile = window.innerWidth <= 600;
        
        // Desktop: horizontally centered within right sidebar (.logoContent spans 10vw to 45vw from right -> 27.5vw right of center = 28% right of center)
        const targetX = isMobile ? 0 : viewport.width * 0.28;
        // Mobile (.logoContent is centered at 30% top => 20% above center). Desktop is vertically centered (0).
        // 0.035 puts it in the exact empty center of the book graphic.
        const targetYBase = isMobile ? viewport.height * 0.225 : 0;
        const targetY = targetYBase + viewport.height * 0.035;
        
        const targetPos = new THREE.Vector3(targetX, targetY, 0);
        
        if (skipIntro && !notified.current) {
           globeRef.current.position.copy(targetPos);
           notified.current = true;
           if (onComplete) onComplete();
        } else {
           globeRef.current.position.lerp(targetPos, 0.05);
           // Trigger logo appearance
           if (globeRef.current.position.distanceTo(targetPos) < 0.2) {
             if (!notified.current) {
               notified.current = true;
               if (onComplete) onComplete();
             }
           }
        }
      }
    }
  });

  return (
    <mesh ref={globeRef} position={[0, 0, 0]} scale={skipIntro ? [0.001, 0.001, 0.001] : [1, 1, 1]}>
      <sphereGeometry args={[1.5, 24, 24]} />
      <meshStandardMaterial ref={matRef} map={texture} roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

export default function Loader({ onGlobeReachRight, skipIntro }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 3, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} />
        <Suspense fallback={<GlobeFallback skipIntro={skipIntro} />}>
          <RotatingGlobe onComplete={onGlobeReachRight} skipIntro={skipIntro} />
        </Suspense>
      </Canvas>
    </div>
  );
}
