export const projectsData = [
  {
    slug: "raa",
    title: "RAA Labs / Atal Tinkering Labs",
    subtitle: "Innovation at Scale",
    content: `Under the RAA Labs initiative, 136 Atal Tinkering Labs have been successfully established in government schools in collaboration with IIT Kanpur and the Education Department of Delhi. These labs have directly impacted 1,40,000+ students and 544 teachers, fostering a culture of innovation, creativity, and problem-solving. Equipped with modern tools such as robotics kits, 3D printers, and electronics components, these labs enable students to engage in hands-on STEM learning, design thinking, and real-world problem-solving.`,
    image: "/raa.jpg",
  },
  {
    slug: "uttarakhand",
    title: "Uttarakhand ATL Programme",
    subtitle: "Expanding Reach in Remote Regions",
    content: `The Uttarakhand ATL initiative aims to establish 160 Atal Tinkering Labs across government schools. Currently, 68 labs have been successfully established, while 92 labs are in advanced stages of deployment. The programme includes large-scale teacher training workshops, mentoring support, and participation in national events like Mega Tinkering Day. It ensures that students in geographically challenging regions gain access to cutting-edge STEM infrastructure and experiential learning opportunities.`,
    image: "/uttrakhand atl.jpeg",
  },
  {
    slug: "ai",
    title: "AI Lab Initiative",
    subtitle: "Early Integration of Future Technologies",
    content: `The AI Lab initiative, implemented in Dehradun, conducted a baseline study involving 108 students from diverse tribal backgrounds across multiple states including Arunachal Pradesh, Mizoram, Assam, Manipur, and Uttarakhand. The findings guided the development of an AI curriculum for classes 4 to 10, emphasizing play-based learning, inclusivity, and gradual skill progression. The initiative highlights the importance of introducing artificial intelligence education at an early stage to prepare students for a technology-driven future.`,
    image: "/ai.jpeg",
  },
  {
    slug: "arunachal",
    title: "Arunachal Pradesh Exposure Programme",
    subtitle: "Transforming Educators",
    content: `Under Project JIGYASA, government teachers from Arunachal Pradesh participated in an immersive exposure visit to IIT Kanpur. The programme focused on computational thinking, inquiry-based pedagogy, STEM integration, and innovation-driven teaching practices. By engaging with cutting-edge research and hands-on demonstrations, educators were empowered to shift from traditional teaching methods to more interactive and student-centric approaches.`,
    image: "/arunachal.jpeg",
  },
  {
    slug: "aghaaz",
    title: "Aghaaz Initiative",
    subtitle: "Experiential Learning in Action",
    content: `The Aghaaz Initiative in Jammu & Kashmir is redefining school education by embedding experiential learning methodologies. Selected from over 376 schools, participating institutions have integrated astronomy-based learning, telescope observations, and model-building into classrooms. The initiative promotes hands-on engagement through Celestial Jamboree Clubs, teacher capacity building sessions led by experts from IITs, ISRO, and IISER, and district-level competitions. It transforms passive learning into active exploration, enabling students to connect theoretical knowledge with real-world scientific observation.`,
    image: "/aaghaz.jpeg"
  },
  {
    slug: "sathee",
    title: "Assistance in establishing Sathee Kendra",
    subtitle: "Democratizing Quality Education at Scale",
    content: `SATHEE, an initiative by the Ministry of Education in collaboration with IIT Kanpur, has emerged as a national platform delivering equitable access to high-quality education. The platform has impacted over 15,00,000+ learners, offering 90,000+ practice questions and 15,000+ hours of expert video lectures. It provides free preparation for major examinations such as JEE, NEET, CUET, SSC, Banking, Railways, CLAT, and ICAR. With features like daily live doubt-clearing sessions, mentorship from IIT and AIIMS students, AI-driven performance analytics, and multilingual support, SATHEE ensures that students from remote and economically weaker sections can compete at par with the best.`,
    image: "/sathee.jpeg"
  },
  {
    slug: "kerala",
    title: "Kerala State Officials Programme",
    subtitle: "Capacity Building for Systemic Impact",
    content: `A specialized 3-day residential training programme conducted at IIT Kanpur brought together state-level officials from Samagra Shiksha, Kerala. The programme focused on strengthening competencies in educational policy, inclusive education, curriculum design, cyber security, and technology integration. Through expert-led sessions and collaborative discussions, the initiative enabled participants to drive systemic improvements and long-term educational reform.`,
    image: "/kerala.jpeg"
  }
];

export const getProjectBySlug = (slug) => {
  return projectsData.find(project => project.slug === slug);
};
