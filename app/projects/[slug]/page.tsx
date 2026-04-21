import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "../../../lib/projectsData";
import styles from "./ProjectDetail.module.css";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const Navbar = dynamic(() => import("../../../components/Navbar"), { ssr: false });
const BackgroundStars = dynamic(() => import("../../../components/BackgroundStars"), { ssr: false });
const CursorOrbit = dynamic(() => import("../../../components/CursorOrbit"), { ssr: false });

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectDetail({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <BackgroundStars />
      <Navbar show={true} />
      <CursorOrbit show={true} />
      
      <div className={styles.contentWrapper}>
        <div className={styles.navigationRow}>
           <Link href="/projects" className={styles.backButton}>
             <MoveLeft className={styles.backIcon} />
             <span>Back to Projects</span>
           </Link>
        </div>

        <div className={styles.heroLayout}>
           <div className={styles.textContent}>
             <h3 className={styles.subtitle}>{project.subtitle}</h3>
             <h1 className={styles.title}>{project.title}</h1>
             
             <div className={styles.divider} />
             
             <p className={styles.descriptionText}>
                {project.content}
             </p>
           </div>
           
         <div className={styles.imageColumn}>
             <div className={styles.imageFrame}>
                <img src={project.image} alt={project.title} className={styles.projectImage} />
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
