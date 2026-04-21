"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const email = "srvshixiit@iitk.ac.in";

  return (
    <footer className={styles.footer} id="contact-section">
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.infoCol}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We are continually expanding our reach to build stronger, more resilient STEM ecosystems in schools. Reach out to us for collaborations, support, or general inquiries.
            </motion.p>
          </div>

          <div className={styles.contactCol}>
            <motion.div
              className={styles.contactCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.cardLabel}>Contact Us</h3>
              <a href={`mailto:${email}`} className={styles.emailLink}>
                {email}
              </a>
            </motion.div>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Sarvshixiit. All rights reserved.</p>
          <p>SARVSHIXIIT</p>
        </div>
      </div>
    </footer>
  );
}
