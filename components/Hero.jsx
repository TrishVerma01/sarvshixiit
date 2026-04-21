import styles from "./Hero.module.css";
import TiltCard from "./TiltCard";

export default function Hero({ showHero, showLogo }) {
  return (
    <div id="hero-section" className={`${styles.heroContainer} ${showHero ? styles.visible : ""}`}>
      {/* Unified Left Content */}
      <div className={styles.leftColumn}>
        <h1 className={styles.heading}>
          Welcome to <span className={styles.headingHighlight}>SARVSHIXIIT</span>
        </h1>
        <div className={styles.taglineBox}>
          <span className={styles.tagline}>Sabko Shiksha Sabko Gyaan, Sarvshixiit ka Abhiyaan</span>
        </div>
        <p className={styles.description}>
          A modern learning space built to guide students with clarity, structure, and real support.
        </p>

        {/* Dashboard Unified Block */}
        <div className={styles.dashboardPanel}>
          <div className={styles.mvRow}>
            <div className={styles.mvBlock}>
              <strong>Mission</strong>
              <p>Empower the next generation of innovators through accessible, hands-on STEM education that inspires curiosity, creativity, and lifelong learning.</p>
            </div>
            <div className={styles.mvDivider}></div>
            <div className={styles.mvBlock}>
              <strong>Vision</strong>
              <p>Become a global leader in STEM education, enabling learners from all backgrounds to become problem-solvers, critical thinkers, and pioneers in technology and science.</p>
            </div>
          </div>

          <div className={styles.cardsGridRow}>
            <TiltCard title="Founded" body="IITK ecosystem" small={true} />
            <TiltCard title="Focus" body="STEM + Guidance" small={true} />
            <TiltCard title="Mode" body="Hybrid Learning" small={true} />
          </div>
        </div>
      </div>

      {/* Center Right / Top Right: Logo */}
      <div className={styles.logoContent}>
        <img
          src="/logo.png"
          alt="Sarvshixiit Logo"
          className={`${styles.logo} ${showLogo ? styles.logoVisible : ""}`}
        />
      </div>


    </div>
  );
}