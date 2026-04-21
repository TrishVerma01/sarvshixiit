"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Reach.module.css";

const INDIA_TOPO_JSON = "/india.geojson";

// Hub coordinate (Kanpur/UP)
const centerPos = [80.3319, 26.4499];

// Our impact nodes
const nodes = [
  {
    id: "hub",
    name: "Command Center (Kanpur)",
    label: "HQ",
    coordinates: centerPos,
    details: "The central framework operating our educational outreach and technological distribution.",
    bullets: [
      "Core operational hub for Sarvshixiit",
      "Coordinates nationwide initiatives",
      "Technology & platform management"
    ]
  },
  {
    id: "jk",
    name: "Jammu and Kashmir",
    label: "Aghaaz Initiative",
    coordinates: [76.5762, 33.7782],
    imagePath: "/aaghaz.jpeg",
    details: "Bringing frontier space and astronomy education directly to the valley.",
    bullets: [
      "Implemented in 376+ schools",
      "Astronomy-based experiential learning",
      "Telescope observations + model building",
      "Celestial Jamboree Clubs",
      "Teacher training with IIT, ISRO, IISER experts",
      "District-level competitions"
    ]
  },
  {
    id: "delhi",
    name: "Delhi",
    label: "RAA / Atal Tinkering Labs",
    coordinates: [77.1025, 28.7041],
    details: "Building the next generation of hardware innovators and tinkerers.",
    bullets: [
      "136 ATL labs established",
      "1,40,000+ students impacted",
      "544 teachers trained",
      "Robotics kits, 3D printers, electronics tools",
      "Focus on innovation + design thinking"
    ]
  },
  {
    id: "uk",
    name: "Uttarakhand",
    label: "Uttarakhand ATL Programme",
    coordinates: [79.0193, 30.0668],
    imagePath: "/uttrakhand atl.jpeg",
    details: "Scaling robust Tinkering labs across complex terrains.",
    bullets: [
      "160 ATL labs planned",
      "68 already operational",
      "92 in deployment phase",
      "Teacher training workshops",
      "Participation in Mega Tinkering Day",
      "STEM access in remote regions"
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    label: "Kerala Officials Training",
    coordinates: [76.2711, 10.8505],
    imagePath: "/kerala.jpeg",
    details: "High-level state administrative and policy training.",
    bullets: [
      "3-day residential programme at IIT Kanpur",
      "Participants from Samagra Shiksha",
      "Focus on policy, curriculum & inclusion",
      "Cybersecurity + tech integration training",
      "Designed for systemic education reform"
    ]
  },
  {
    id: "dehradun",
    name: "Dehradun (Uttarakhand)",
    label: "AI Lab Initiative",
    coordinates: [78.0322, 30.3165],
    imagePath: "/ai.jpeg",
    details: "Cutting-edge artificial intelligence education for tribal and diverse communities.",
    bullets: [
      "Baseline study with 108 students",
      "Focus on tribal & diverse backgrounds",
      "AI curriculum for Classes 4–10",
      "Play-based & inclusive learning",
      "Early exposure to AI concepts"
    ]
  },
  {
    id: "arunachal",
    name: "Arunachal Pradesh",
    label: "JIGYASA Exposure",
    coordinates: [94.7278, 28.2180],
    imagePath: "/arunachal.jpeg",
    details: "Transforming interactive teaching and STEM integration.",
    bullets: [
      "Teachers trained at IIT Kanpur",
      "Focus on computational thinking",
      "Inquiry-based pedagogy",
      "STEM integration methods",
      "Shift to interactive teaching"
    ]
  },
  {
    id: "ne_india",
    name: "North-East India",
    label: "AI Lab Outreach",
    coordinates: [92.9376, 26.2006], /* Assam region coordinates */
    details: "Impacting Arunachal Pradesh, Mizoram, Assam, and Manipur through AI education focused on underserved communities.",
    bullets: [
      "Students from multiple NE states",
      "Inclusive AI education initiative",
      "Focus on underserved communities",
      "Data-driven curriculum design"
    ]
  }
];

export default function Reach() {
  const [selectedNode, setSelectedNode] = useState(null);
  const activeData = nodes.find(n => n.id === selectedNode);

  return (
    <section id="presence-section" className={styles.reachSection}>
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            Our <span className={styles.highlight}>Reach</span>
          </h2>
          <p className={styles.subtitle}>
            Explore our real-world impact spanning from the Himalayan mountains to the eastern borders of India. Click on any project location to explore the educational infrastructure and operations we&apos;ve deployed on the ground.
          </p>
        </div>

        <div className={styles.mapContainer}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1100,
              center: [80, 22] // Centered perfectly on India
            }}
            width={800}
            height={600}
            className={styles.mapCanvas}
          >
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0f172a" /* Deep slate to match the background */
                    stroke="#334155" /* Subtle edge delineation */
                    strokeWidth={0.7}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#1e293b", outline: "none", transition: "all 250ms" },
                      pressed: { outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Projects Array Rendering */}
            {nodes.map((node) => (
              <Marker key={node.id} coordinates={node.coordinates} onClick={() => setSelectedNode(node.id)}>
                {node.id === "hub" ? (
                  /* Kanpur gets a specialized base point */
                  <g className={styles.hubMarker}>
                    <circle r={12} fill="#0ea5e9" opacity={0.2} className={styles.pulseAnim} />
                    <circle r={4} fill="#bae6fd" />
                  </g>
                ) : (
                  /* Other states get physical red pins and specific titles */
                  <g className={styles.locationPinWrapper}>
                    {/* Pulsing red beacon underneath the pin */}
                    <circle r={8} fill="#ef4444" opacity={0.3} className={styles.pulseAnim} />
                    
                    {/* SVG Map Pin pointing precisely at center coordinates */}
                    <g transform="translate(-12, -24)">
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                        fill="#ef4444" 
                        className={styles.mapPinIcon}
                      />
                      <circle cx="12" cy="9" r="2.5" fill="#1e293b" />
                    </g>
                    
                    {/* Dynamic Label positioned strictly to the right */}
                    <text 
                      x={14} 
                      y={-5} 
                      className={styles.locationLabelText}
                    >
                      {node.label}
                    </text>
                  </g>
                )}
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>

      {/* Framer Motion Overlay Modal */}
      <AnimatePresence>
        {selectedNode && activeData && (
          <div className={styles.overlayWrapper}>
            <motion.div 
              className={styles.overlayBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
            />
            
            <div className={styles.overlayContentCenter}>
              <motion.div 
                layoutId={`node-${selectedNode}`}
                className={styles.fullProfileCard}
              >
                <div className={styles.profileHeader}>
                  {activeData.imagePath ? (
                    <motion.img 
                      layoutId={`avatar-${selectedNode}`} 
                      src={activeData.imagePath} 
                      className={styles.profileAvatar} 
                      onError={(e) => {
                         e.target.style.display = 'none';
                         e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={styles.profileAvatarPlaceholder} 
                    style={{ display: activeData.imagePath ? 'none' : 'flex' }}
                  >
                     <div className={styles.innerPulse} />
                  </div>
                  <button className={styles.closeButton} onClick={() => setSelectedNode(null)}>×</button>
                </div>
                
                <div className={styles.profileBody}>
                  <motion.h2 layoutId={`title-${selectedNode}`} className={styles.profileName}>
                    {activeData.name}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.longBio}
                  >
                    <p className={styles.profileDescription}>{activeData.details}</p>
                    
                    <div className={styles.expertGrid}>
                      <div className={styles.expertColumn} style={{ gridColumn: 'span 2' }}>
                        <h4 className={styles.sectionTitle}>Key Highlights</h4>
                        <ul className={styles.itemList}>
                          {activeData.bullets?.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
