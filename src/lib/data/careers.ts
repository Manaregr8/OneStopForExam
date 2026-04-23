export type CareerField = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  duration: string;
  eligibility: string[];
  admissionProcess: string[];
  coreSubjects: string[];
  specializedSubjects: string[];
  skillsRequired: string[];
  internshipCompanies: string[];
  internshipPlatforms?: string[];
  careerRoles: string[];
  higherStudies: string[];
  topRecruiters: string[];
  jobSectors: string[];
  salaryFresher: string;
  salaryExperienced: string;
  technicalSkills: string[];
  whyChoose: string[];
  challenges: string[];
  conclusion: string;
  studyTimetable?: {
    college: string;
    selfStudy: string;
    coding: string;
    total: string;
  };
  iconName: string; // Lucide icon name
  color: string; // CSS gradient for card accent
};

export const CAREER_FIELDS: CareerField[] = [
  {
    slug: "software-engineering",
    name: "Software Engineering",
    shortName: "SE",
    tagline: "Design, develop, test and maintain software systems",
    description:
      "B.Tech in Software Engineering is a 4-year professional degree focused on programming, coding, software development, and building web and mobile applications. This field teaches students how to design, develop, test, and maintain software systems used in industries like IT, banking, healthcare, and e-commerce.",
    duration: "4 Years · 8 Semesters",
    eligibility: [
      "Must have passed 12th class with Physics, Chemistry, and Mathematics (PCM)",
      "Minimum 50–75% marks (varies by college)",
      "Must qualify entrance exams for government or private colleges",
    ],
    admissionProcess: [
      "JEE Main",
      "State-level engineering exams",
      "Direct admission in private colleges",
    ],
    coreSubjects: [
      "Programming (C, C++, Java, Python)",
      "Data Structures and Algorithms (DSA)",
      "Database Management System (DBMS)",
      "Operating Systems",
      "Computer Networks",
    ],
    specializedSubjects: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Cloud Computing",
    ],
    skillsRequired: [
      "Strong coding and programming skills",
      "Logical and analytical thinking",
      "Problem-solving ability",
      "Interest in technology and software",
      "Consistency in practice (coding daily)",
    ],
    internshipCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato", "Paytm"],
    internshipPlatforms: ["Internshala", "LinkedIn", "Company career pages"],
    careerRoles: [
      "Software Developer",
      "Web Developer",
      "App Developer",
      "Data Analyst",
      "AI/ML Engineer",
      "Backend/Frontend Developer",
    ],
    higherStudies: [
      "M.Tech in Computer Science / Software Engineering",
      "MS abroad",
      "MBA for management roles",
    ],
    topRecruiters: [
      "Google",
      "Microsoft",
      "Amazon",
      "TCS",
      "Infosys",
      "Wipro",
      "Startups & product-based companies",
    ],
    jobSectors: ["IT Industry", "E-commerce", "Banking & Finance", "Startups", "Government IT departments"],
    salaryFresher: "3–8 LPA",
    salaryExperienced: "₹10–25 LPA (product companies) · ₹20+ LPA with experience",
    technicalSkills: [
      "Programming Languages (Java, Python, C++)",
      "DSA (Data Structures & Algorithms)",
      "Web Development (HTML, CSS, JavaScript)",
      "Git & GitHub",
      "Cloud & Databases",
    ],
    whyChoose: [
      "High demand and job opportunities",
      "Work in top tech companies",
      "Remote and global opportunities",
      "High salary growth",
    ],
    challenges: [
      "High competition",
      "Continuous learning required",
      "Strong coding skills needed",
      "Pressure of deadlines in jobs",
    ],
    conclusion:
      "B.Tech in Software Engineering is an excellent choice for students interested in coding and technology. With strong programming skills, projects, and internships, students can build a successful career in top tech companies in India and abroad.",
    iconName: "Monitor",
    color: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
  },
  {
    slug: "aerospace-engineering",
    name: "Aerospace Engineering",
    shortName: "AE",
    tagline: "Design aircraft, spacecraft, rockets and satellites",
    description:
      "B.Tech in Aerospace Engineering is a 4-year professional degree focused on the design, development, testing, and maintenance of aircraft, spacecraft, rockets, and satellites. This field blends physics, mathematics, and advanced engineering concepts to build modern aviation and space technologies.",
    duration: "4 Years · 8 Semesters",
    eligibility: [
      "Must have passed 12th class with Physics, Chemistry, and Mathematics (PCM)",
      "Minimum 60–75% marks (varies by college)",
      "Must qualify entrance exams like JEE Main or JEE Advanced for top institutes",
    ],
    admissionProcess: [
      "JEE Main",
      "JEE Advanced (for IITs)",
      "State-level engineering exams",
    ],
    coreSubjects: [
      "Engineering Mathematics",
      "Engineering Physics",
      "Computer Programming",
      "Engineering Drawing",
    ],
    specializedSubjects: [
      "Aerodynamics",
      "Thermodynamics",
      "Fluid Mechanics",
      "Flight Mechanics",
      "Propulsion Systems",
      "Aircraft Structures",
      "Avionics",
      "Space Technology",
    ],
    skillsRequired: [
      "Strong command in Physics and Mathematics",
      "Analytical and problem-solving skills",
      "Interest in aircraft and space systems",
      "Technical and software knowledge",
      "Creativity and innovation mindset",
    ],
    internshipCompanies: ["ISRO", "DRDO", "HAL", "NAL", "Tata Advanced Systems", "Boeing", "Airbus"],
    internshipPlatforms: ["Official websites", "LinkedIn", "College placement cell"],
    careerRoles: [
      "Aerospace Engineer",
      "Design Engineer",
      "R&D Engineer",
      "Simulation Engineer",
      "Aircraft Maintenance Engineer",
      "Avionics Engineer",
    ],
    higherStudies: [
      "M.Tech in Aerospace Engineering",
      "MS abroad",
      "MBA for management roles",
    ],
    topRecruiters: ["ISRO", "DRDO (via GATE)", "Boeing", "Airbus", "HAL", "Private aviation & defense companies"],
    jobSectors: ["Aviation industry", "Space research", "Defense sector", "Research organizations"],
    salaryFresher: "3–6 LPA",
    salaryExperienced: "₹8–20 LPA · International opportunities offer higher packages",
    technicalSkills: ["MATLAB", "ANSYS", "CATIA"],
    whyChoose: [
      "Work on aircraft and space missions",
      "High-tech and innovative field",
      "Global career opportunities",
      "Chance to contribute to space exploration",
    ],
    challenges: [
      "Tough competition",
      "High level of technical knowledge required",
      "Limited core jobs in India compared to other branches",
    ],
    conclusion:
      "B.Tech in Aerospace Engineering is ideal for students passionate about aviation and space. With the right skills, internships, and dedication, it offers exciting career opportunities in both India and abroad.",
    iconName: "Rocket",
    color: "linear-gradient(135deg, #0369a1, #0ea5e9)",
  },
  {
    slug: "ai-ml",
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AI & ML",
    tagline: "Build intelligent systems and data-driven technologies",
    description:
      "Artificial Intelligence (AI) and Machine Learning (ML) are modern technologies that enable computers and machines to learn from data and make decisions like humans. AI focuses on making machines intelligent, while ML allows systems to learn automatically without being explicitly programmed.",
    duration: "4 Years · 8 Semesters",
    eligibility: [
      "12th pass with PCM (Physics, Chemistry, Mathematics)",
      "Minimum 50–75% marks (depends on college)",
    ],
    admissionProcess: [
      "JEE Main or state-level exams",
      "Direct admission in private colleges",
    ],
    coreSubjects: [
      "Python Programming",
      "Data Structures & Algorithms",
      "C++ / Java Basics",
      "Mathematics (Linear Algebra, Statistics)",
    ],
    specializedSubjects: [
      "Machine Learning",
      "Deep Learning",
      "Artificial Neural Networks",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Big Data (Hadoop, Spark)",
      "Cloud Computing (AWS, Azure)",
    ],
    skillsRequired: [
      "Strong mathematics (especially statistics)",
      "Programming skills (Python is a must)",
      "Logical thinking",
      "Data analysis skills",
      "Problem-solving ability",
    ],
    internshipCompanies: ["Google", "Microsoft", "Amazon", "Infosys", "Wipro"],
    internshipPlatforms: ["Internshala", "LinkedIn"],
    careerRoles: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Data Scientist",
      "Data Analyst",
      "Python Developer",
      "Software Engineer",
    ],
    higherStudies: [
      "M.Tech in AI / Data Science",
      "MS abroad in AI/ML",
      "Research roles in AI labs",
    ],
    topRecruiters: [
      "Google",
      "Amazon",
      "Microsoft",
      "Infosys",
      "Wipro",
      "AI-focused startups",
    ],
    jobSectors: [
      "Technology companies",
      "Healthcare & finance",
      "Automation industry",
      "Research organizations",
      "Government IT (DRDO, PSUs)",
    ],
    salaryFresher: "4–12 LPA",
    salaryExperienced: "₹15–30+ LPA",
    technicalSkills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "SQL & NoSQL Databases", "AWS / Azure Cloud"],
    whyChoose: [
      "High demand and salary",
      "Cutting-edge technology field",
      "Global opportunities",
      "Innovation-driven career",
    ],
    challenges: [
      "Requires strong maths knowledge",
      "Continuous learning needed",
      "Complex concepts",
    ],
    conclusion:
      "AI & ML is one of the fastest-growing fields in technology. If you are interested in data, automation, and smart systems, this field offers excellent career opportunities and future growth.",
    iconName: "Cpu",
    color: "linear-gradient(135deg, #7c3aed, #db2777)",
  },
  {
    slug: "computer-science-engineering",
    name: "Computer Science Engineering",
    shortName: "CSE",
    tagline: "Build software, websites, apps and intelligent systems",
    description:
      "Computer Science Engineering (CSE) is a professional course that focuses on computers, programming, and modern technology. It is one of the most popular engineering branches where students learn how to build software, websites, applications, and intelligent systems. This course is best for students who want to make a career in the IT industry and are interested in coding and problem-solving.",
    duration: "B.Tech / B.E.: 4 Years · Diploma: 3 Years · BCA: 3 Years",
    eligibility: [
      "12th pass with Physics, Chemistry, Mathematics (PCM)",
      "Minimum 50–60% marks (depends on college)",
    ],
    admissionProcess: [
      "Entrance exams (JEE, state-level exams)",
      "Direct admission in private colleges",
    ],
    coreSubjects: [
      "Programming Languages (C, C++, Java, Python)",
      "Data Structures & Algorithms",
      "Database Management System (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    specializedSubjects: [
      "Artificial Intelligence (AI)",
      "Machine Learning (ML)",
      "Cyber Security",
      "Cloud Computing",
      "Web Development",
    ],
    skillsRequired: [
      "Logical thinking",
      "Problem-solving ability",
      "Coding skills",
      "Basic mathematics",
      "Communication and teamwork",
    ],
    internshipCompanies: [
      "Google",
      "Microsoft",
      "Amazon",
      "Infosys",
      "Tata Consultancy Services",
      "Wipro",
    ],
    internshipPlatforms: ["Internshala", "LinkedIn", "Company career pages"],
    careerRoles: [
      "Software Developer",
      "Web Developer",
      "Data Scientist",
      "AI Engineer",
      "Cyber Security Expert",
      "App Developer",
      "Game Developer",
    ],
    higherStudies: [
      "M.Tech in Computer Science",
      "MS abroad",
      "MBA for management roles",
    ],
    topRecruiters: [
      "Google",
      "Microsoft",
      "Amazon",
      "Infosys",
      "Tata Consultancy Services",
      "Wipro",
    ],
    jobSectors: ["IT industry", "E-commerce", "Banking & Finance", "Healthcare tech", "Startups"],
    salaryFresher: "3–8 LPA",
    salaryExperienced: "₹10–50+ LPA (top companies offer higher packages)",
    technicalSkills: [
      "C / C++, Java, Python, JavaScript",
      "Data Structures & Algorithms",
      "Web Development (HTML, CSS, JS)",
      "Git & GitHub",
      "Cloud platforms (AWS, GCP, Azure)",
      "Databases (SQL, MongoDB)",
    ],
    whyChoose: [
      "High salary packages",
      "Work from home opportunities",
      "Global career scope",
      "Freelancing options",
    ],
    challenges: [
      "Continuous learning required",
      "High competition",
      "Long screen time",
    ],
    conclusion:
      "Computer Science Engineering is one of the best career options for students interested in technology. With proper skills, dedication, and practice, students can build a successful and high-paying career in this field.",
    studyTimetable: {
      college: "5–6 hours",
      selfStudy: "2–3 hours",
      coding: "1–2 hours",
      total: "7–9 hours daily",
    },
    iconName: "Terminal",
    color: "linear-gradient(135deg, #059669, #0d9488)",
  },
];

export function getCareerBySlug(slug: string): CareerField | undefined {
  return CAREER_FIELDS.find((c) => c.slug === slug);
}
