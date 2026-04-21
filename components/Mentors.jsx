"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightTiltCard from "./SpotlightTiltCard";
import styles from "./Mentors.module.css";

const mentorsData = [
  {
    id: "amey-karkare",
    name: "Prof. Amey Karkare",
    role: "Head, Computer Science & Engineering · IIT Kanpur Joint Appointment in Department of Intelligent Systems(DIS) in Wadhwani School of Data Science of AI & Intelligent Systems(WSAIS)",
    shortBio: "Transforming how programming is taught through intelligent learning systems.",
    tags: ["Programming Pedagogy", "EdTech", "IITK"],
    imagePath: "/amey.jpg",
    fullBio: "Prof. Amey Karkare is a distinguished leader in Compiler Design, Functional Programming,Program Analysis & Code Optimization. His research and mentorship lay the foundational architecture for next-generation systems engineers in the global tech ecosystem.",
    expertise: ["Program Analysis", "Compiler Optimization", "Programming Languages and Education"],
    achievements: ["Poonam and Prabhu Goel Chair Fellowship at IITK", "1989 Batch Faculty Award IITK", "Best Faculty of the Year Award in cateogry INNOVATION APPLICATION OF TECHNOLOGY TOOLS IN TEACHING/LEARNING", "P.K. Kelkar Young Faculty Research Fellowship"],
    email: "karkare@iitk.ac.in",
    website: "https://www.cse.iitk.ac.in/users/karkare/"
  },
  {
    id: "anurag-pandey",
    name: "Prof. Anurag Pandey",
    role: "Senior Project Engineer . Deptt of CSE",
    shortBio: "Research Establishment Officer (DORD), IIT Kanpur",
    tags: ["DORD", "Execution", "IITK"],
    imagePath: "/anurag.jpg",
    fullBio: "Anurag Pandey orchestrates sprawling Research and Development ecosystems. Specializing in bridging the gap between deep-tech research and tangible execution, he fosters an ecosystem where academic innovation transforms precisely into scalable real-world enterprise reality.",
    expertise: ["Research Officer"],
    email: "anuragpn@iitk.ac.in"
  }
];

export default function Mentors() {
  const [selectedId, setSelectedId] = useState(null);
  const activeMentor = mentorsData.find((m) => m.id === selectedId);

  return (
    <section id="mentors-section" className={styles.mentorsSection}>
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            Architects of <span className={styles.highlight}>Learning</span>
          </h2>
          <p className={styles.subtitle}>
            Behind every transformative journey is someone who chooses to guide, not just teach.
            At Sarvshixiiit, our mentors are more than educators, they are thinkers, innovators, and builders of the future.
            With experience across disciplines and a shared passion for impact, they don&apos;t just deliver knowledge, they shape perspectives.
            Step in, explore their journeys, and discover the minds that power ours.
          </p>
        </div>

        <div className={styles.mentorsGrid}>
          {mentorsData.map((mentor) => (
            <SpotlightTiltCard
              key={mentor.id}
              id={mentor.id}
              name={mentor.name}
              role={mentor.role}
              shortBio={mentor.shortBio}
              tags={mentor.tags}
              imagePath={mentor.imagePath}
              onClick={setSelectedId}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && activeMentor && (
          <div className={styles.overlayWrapper}>
            <motion.div
              className={styles.overlayBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />

            <div className={styles.overlayContentCenter}>
              <motion.div
                layoutId={`mentor-${selectedId}`}
                className={styles.fullProfileCard}
              >
                <div className={styles.profileHeader}>
                  {activeMentor.imagePath ? (
                    <motion.img layoutId={`avatar-${selectedId}`} src={activeMentor.imagePath} className={styles.profileAvatar} />
                  ) : (
                    <motion.div layoutId={`avatar-${selectedId}`} className={styles.profileAvatarPlaceholder} />
                  )}
                  <button className={styles.closeButton} onClick={() => setSelectedId(null)}>×</button>
                </div>

                <div className={styles.profileBody}>
                  <motion.h2 layoutId={`name-${selectedId}`} className={styles.profileName}>
                    {activeMentor.name}
                  </motion.h2>
                  <motion.p layoutId={`role-${selectedId}`} className={styles.profileRole}>
                    {activeMentor.role}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.longBio}
                  >
                    <p className={styles.profileDescription}>{activeMentor.fullBio}</p>

                    <div className={styles.expertGrid}>
                      <div className={styles.expertColumn}>
                        <h4 className={styles.sectionTitle}>Key Expertise Areas</h4>
                        <ul className={styles.itemList}>
                          {activeMentor.expertise?.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                      <div className={styles.expertColumn}>
                        <h4 className={styles.sectionTitle}>Experience & Achievements</h4>
                        <ul className={styles.itemList}>
                          {activeMentor.achievements?.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.contactLinks}>
                      {activeMentor.email && (
                        <a href={`mailto:${activeMentor.email}`} className={styles.contactBadge}>
                          <span style={{ marginRight: '8px' }}>✉</span> {activeMentor.email}
                        </a>
                      )}
                      {activeMentor.website && (
                        <a href={activeMentor.website} target="_blank" rel="noopener noreferrer" className={styles.contactBadge}>
                          <span style={{ marginRight: '8px' }}>🔗</span> Faculty Profile
                        </a>
                      )}
                    </div>

                    <div className={styles.profileTags}>
                      {activeMentor.tags.map((tag, idx) => (
                        <span key={idx} className={styles.profileTag}>{tag}</span>
                      ))}
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
