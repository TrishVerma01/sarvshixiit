"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlobeMesh() {
  const ref = useRef();

  const texture = useLoader(THREE.TextureLoader, "/earth.jpg");

  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });

  return (
    <>
      {/* 🌍 Earth */}
      <Sphere ref={ref} args={[2, 64, 64]}>
        <meshStandardMaterial map={texture} />
      </Sphere>

      {/* ✨ Glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.15}
        />
      </Sphere>
    </>
  );
}

export default function Globe() {
  return (
    // 🌌 BACKGROUND ADDED HERE
    <div style={{ height: "100vh", background: "#0b1220" }}>
      
      {/* 🎯 CANVAS (lighting goes inside this) */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        
        {/* 💡 LIGHTING HERE */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1} />

        {/* 🌍 GLOBE */}
        <GlobeMesh />
      </Canvas>

    </div>
  );
}