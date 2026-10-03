export const projects = [
  {
    id: "email-security-ai",
    number: "01",
    title: "Email Security AI",
    category: "AI/ML / Cybersecurity",
    description: "An end-to-end email security and spam detection platform.",
    technologies: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Linear SVM", "Streamlit"],
    problem: "Identifying potential threats and generating security risk assessments from email content.",
    approach: "Built a deterministic security decisioning system that extracts TF-IDF features and uses a Linear SVM classifier.",
    functionality: ["Email parsing", "ML classification", "Security indicator analysis", "Risk scoring", "Deterministic security decisioning", ".eml file scanning", "Direct email-text analysis", "Streamlit security dashboard"],
    architecture: ["Email input", "Parsing", "Feature extraction", "ML classification", "Security analysis", "Risk scoring", "Decision"]
  },
  {
    id: "netops-ai-soc",
    number: "02",
    title: "NetOps AI SOC",
    category: "AI/ML / Network Security",
    description: "A network monitoring and security operations platform combining network traffic collection, machine learning, and rule-based detection.",
    technologies: ["Python", "Scapy", "Scikit-learn", "Random Forest", "Streamlit", "SQLite"],
    problem: "Real-time network traffic monitoring and incident management lacking integrated intelligent threat detection.",
    approach: "Developed a Scapy-based network flow collector integrated with Random Forest ML detection and rule-based risk scoring.",
    functionality: ["Network traffic collection", "ML detection", "Rule-based detection", "Risk scoring", "Security alerting", "Incident management"],
    architecture: ["Traffic Collection", "Feature Engineering", "Random Forest Inference", "Rule Engine", "Alert Generation", "SOC Dashboard"]
  },
  {
    id: "e-hospital",
    number: "03",
    title: "E-Hospital",
    category: "Web Development / Academic Project",
    description: "Hospital-related service/application for receiving updates regarding hospitals.",
    technologies: ["Web Technologies"],
    problem: "Accessing centralized hospital-related information and updates.",
    approach: "Developed a web-based platform for hospital services as a B.Tech academic project.",
    functionality: ["Hospital updates", "Information retrieval"],
    architecture: []
  }
];
