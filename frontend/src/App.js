import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'education', 'research', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you for your message! I will get back to you soon.' 
      });
      setFormData({ name: '', email: '', phone: '', address: '', comment: '' });
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please email me directly at masfiqur.nehal509@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      title: "Horizon Travel",
      subtitle: "Smart Booking UI",
      description: "Modern travel booking platform with clean UX and reusable React components for seamless user experience.",
      tech: ["React", "Tailwind CSS", "Vercel"],
      impact: "Clean UX, reusable components",
      liveUrl: "https://nehal-horizon-travel.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/Horizon-Travel-Website"
    },
    {
      title: "Book Vibe",
      subtitle: "Modern Book Store",
      description: "Component-driven book store application with intuitive navigation and responsive design.",
      tech: ["React", "Vercel"],
      impact: "Component-driven UI",
      liveUrl: "https://nehal-book-store-hub.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/book-vibe-react-app"
    },
    {
      title: "Alpha Clash Pro",
      subtitle: "Gaming UI",
      description: "Interactive gaming interface with smooth animations and engaging user interactions.",
      tech: ["React", "Vercel"],
      impact: "Interactive UI, animations",
      liveUrl: "https://nehal-alpha-clash-pro.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/alpha-clash-pro"
    },
    {
      title: "Knowledge Cafe Blog",
      subtitle: "Content Platform",
      description: "SEO-friendly blog platform with optimized content structure and clean reading experience.",
      tech: ["React", "Tailwind CSS"],
      impact: "SEO-friendly content structure",
      liveUrl: "https://nehal-cafe-blog.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/react-Knowledge-Cafe"
    },
    {
      title: "Phone Hunter API",
      subtitle: "API Integration",
      description: "API-driven frontend showcasing dynamic data fetching and responsive design patterns.",
      tech: ["React", "API Integration"],
      impact: "API-driven frontend",
      liveUrl: "https://nehal-phone-hunter-api.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/phone-hunter-API"
    },
    {
      title: "Tea House Project",
      subtitle: "Business Website",
      description: "Professional small business website with modern design and clear call-to-actions.",
      tech: ["React", "Vercel"],
      impact: "Small business UI",
      liveUrl: "https://nehal-tea-house-project.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/Tea-House-Project"
    },
    {
      title: "G3 Architects",
      subtitle: "Business Site",
      description: "Client-ready architectural firm website with portfolio showcase and professional design.",
      tech: ["React", "Vercel"],
      impact: "Client-ready design",
      liveUrl: "https://nehal-g3-architects-website.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/g3-architects-website"
    },
    {
      title: "Biker Zone",
      subtitle: "Landing Site",
      description: "High-converting landing page with strategic CTA placement and compelling design.",
      tech: ["React", "Vercel"],
      impact: "High-converting CTA design",
      liveUrl: "https://nehal-biker-zone.vercel.app/",
      sourceUrl: "https://github.com/MasfiqurNehal/Biker-Zone-Website"
    }
  ];

  const techStack = [
    { name: "React", color: "from-blue-500 to-blue-600" },
    { name: "JavaScript", color: "from-yellow-400 to-yellow-500" },
    { name: "Tailwind CSS", color: "from-cyan-400 to-cyan-500" },
    { name: "HTML & CSS", color: "from-orange-400 to-orange-500" },
    { name: "TensorFlow", color: "from-orange-500 to-red-500" },
    { name: "MySQL", color: "from-blue-500 to-indigo-600" }
  ];

  const skills = {
    "Frontend Development": [
      "HTML5, CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "React Router",
      "Tailwind CSS",
      "DaisyUI"
    ],
    "AI / ML / DL": [
      "Python",
      "Pandas, NumPy",
      "TensorFlow",
      "Machine Learning",
      "Deep Learning",
      "Kaggle, Google Colab"
    ],
    "Programming & Tools": [
      "C, Python, Java",
      "Git, GitHub",
      "VS Code",
      "Chrome DevTools",
      "Figma, Canva",
      "Microsoft Office"
    ],
    "Databases": [
      "MySQL",
      "MongoDB"
    ],
    "Core Concepts": [
      "OOP",
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Computer Architecture"
    ],
    "Soft Skills": [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Time Management"
    ]
  };

  const research = [
    {
      title: "Gender Classification from Bengali Text",
      type: "AI/NLP Research",
      platform: "ResearchGate"
    },
    {
      title: "API Documentation Q&A Agent",
      type: "AI Project",
      platform: "GitHub"
    },
    {
      title: "AI Deep Learning Image Classification",
      type: "Academic Project",
      platform: "Academic"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
              data-testid="nav-logo"
            >
              Md. Masfiqur Rahman Nehal
            </button>
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills', 'education', 'research', 'about', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all font-medium ${
                    activeSection === section 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                  data-testid={`nav-${section}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-400 rounded-full text-sm font-medium mb-8" data-testid="availability-badge">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Available for Work
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-name">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Md. Masfiqur Rahman Nehal
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light" data-testid="hero-title">
                <span className="text-cyan-400 font-semibold">Software Engineer</span> | 
                <span className="text-blue-400 font-semibold"> Frontend (React)</span> | 
                <span className="text-purple-400 font-semibold"> Web Development</span> | 
                <span className="text-pink-400 font-semibold"> AI / ML Enthusiast</span>
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl" data-testid="hero-description">
                I build <span className="text-white font-semibold">modern, responsive interfaces</span> using React-style component patterns, with a strong focus on <span className="text-cyan-400">clean UI</span>, <span className="text-blue-400">performance</span>, <span className="text-purple-400">accessibility</span>, and scalable frontend architecture. Ready for <span className="text-white font-semibold">corporate, multinational, fintech, and startup roles</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transform"
                  data-testid="cta-projects"
                >
                  <span className="flex items-center justify-center gap-2">
                    Featured Projects
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/20 hover:border-white/50 transition-all"
                  data-testid="cta-contact"
                >
                  Contact Me
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                
                {/* Middle gradient ring */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 p-1.5 shadow-2xl">
                  {/* Inner white ring */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                    {/* Profile image */}
                    <img 
                      src="https://customer-assets.emergentagent.com/job_hii-hello-62/artifacts/3h91qb9z_profile.png" 
                      alt="Md. Masfiqur Rahman Nehal - Software Engineer"
                      className="w-full h-full rounded-full object-cover shadow-2xl ring-4 ring-cyan-500/30"
                      data-testid="profile-image"
                    />
                  </div>
                </div>
                
                {/* Bottom shadow for depth */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-blue-500/20 blur-2xl rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-20" data-testid="tech-stack-section">
            <p className="text-center text-gray-400 mb-8 font-medium text-lg">Core Technology Stack</p>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${tech.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all`}
                  data-testid={`tech-badge-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent" data-testid="projects-heading">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of my recent work showcasing frontend development expertise and problem-solving skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article 
                key={index}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105 transform"
                data-testid={`project-card-${index}`}
              >
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors" data-testid={`project-title-${index}`}>
                  {project.title}
                </h3>
                <p className="text-sm text-cyan-400 font-medium mb-4">{project.subtitle}</p>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-green-400 font-medium mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {project.impact}
                </p>
                <div className="flex gap-3">
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center font-medium hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
                    data-testid={`project-live-${index}`}
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg text-center font-medium hover:bg-white/20 transition-all border border-white/20"
                    data-testid={`project-source-${index}`}
                  >
                    Source Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-testid="skills-heading">
              Technical Skills
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive skill set spanning frontend development, AI/ML, and software engineering
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all border border-gray-700 hover:border-purple-500/50"
                data-testid={`skill-category-${index}`}
              >
                <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b-2 border-purple-500">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">▹</span>
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-3">Languages</h3>
            <p className="text-gray-300 text-lg"><span className="text-cyan-400 font-semibold">Bengali</span> (Native) • <span className="text-blue-400 font-semibold">English</span> (Professional)</p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent" data-testid="education-heading">
              Education
            </h2>
            <p className="text-gray-400 text-lg">Academic background and achievements</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <article className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-10 shadow-xl border border-blue-500/30 hover:border-blue-400/50 transition-all" data-testid="education-bsc">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Bachelor of Science in Computer Science & Engineering (CSE)
                  </h3>
                  <a 
                    href="https://daffodilvarsity.edu.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-cyan-400 hover:text-cyan-300 font-semibold mb-4 inline-block hover:underline transition-colors"
                  >
                    Daffodil International University
                  </a>
                </div>
              </div>
            </article>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border border-gray-700 hover:border-green-500/50 transition-all" data-testid="education-hsc">
                <h3 className="text-2xl font-bold text-white mb-3">Higher Secondary Certificate (HSC)</h3>
                <p className="text-gray-300 text-lg mb-2"><strong className="text-cyan-400">Group:</strong> Science</p>
              </article>
              <article className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border border-gray-700 hover:border-green-500/50 transition-all" data-testid="education-ssc">
                <h3 className="text-2xl font-bold text-white mb-3">Secondary School Certificate (SSC)</h3>
                <p className="text-gray-300 text-lg mb-2"><strong className="text-cyan-400">Group:</strong> Science</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" data-testid="research-heading">
              Research & AI Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Applied AI/ML research and development projects
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {research.map((item, index) => (
              <article 
                key={index}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 shadow-lg border border-purple-500/30 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                data-testid={`research-item-${index}`}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full font-medium border border-purple-500/30">
                    {item.type}
                  </span>
                  <span className="text-gray-400">{item.platform}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" data-testid="about-heading">
              About Me
            </h2>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a final-year <strong className="text-white">Computer Science & Engineering undergraduate</strong> at <strong className="text-cyan-400">Daffodil International University</strong> with a strong passion for <strong className="text-blue-400">frontend development</strong> using <strong className="text-cyan-400">React</strong>. My expertise lies in building modern, responsive, and user-centric web applications with clean code and scalable architecture.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Beyond frontend development, I have a growing proficiency in <strong className="text-purple-400">full-stack development</strong> and <strong className="text-pink-400">AI/ML technologies</strong>, including machine learning, deep learning, and natural language processing. I actively work on applied AI projects and research, particularly in areas like NLP and computer vision.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I maintain a <strong className="text-green-400">clean code mindset</strong> and prioritize <strong className="text-blue-400">performance</strong>, <strong className="text-purple-400">accessibility</strong>, and <strong className="text-cyan-400">user experience</strong> in every project. My work reflects a balance between aesthetic design and functional engineering.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I am ready to contribute to professional software engineering teams in <strong className="text-white">corporate</strong>, <strong className="text-white">multinational</strong>, <strong className="text-white">fintech</strong>, and <strong className="text-white">startup environments</strong>, bringing dedication, problem-solving skills, and a collaborative mindset.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="contact-heading">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg">
              I'm available for professional opportunities. Feel free to reach out!
            </p>
          </div>

          {/* Direct Contact Options First */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 shadow-2xl mb-10 border border-cyan-500/30">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Direct Contact</h3>
            
            {/* Email visible */}
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-3">Email:</p>
              <a 
                href="mailto:masfiqur.nehal509@gmail.com"
                className="text-2xl text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
              >
                masfiqur.nehal509@gmail.com
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* LinkedIn First */}
              <a 
                href="https://www.linkedin.com/in/masfiqur-nehal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform w-full sm:w-auto justify-center"
                data-testid="contact-linkedin-button"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              {/* GitHub Second */}
              <a 
                href="https://github.com/MasfiqurNehal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:scale-105 transform w-full sm:w-auto justify-center"
                data-testid="contact-github-button"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              {/* Email Third */}
              <a 
                href="mailto:masfiqur.nehal509@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transform w-full sm:w-auto justify-center"
                data-testid="contact-email-button"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Email
              </a>
            </div>
            <p className="text-center text-gray-400 mt-8 text-sm">
              CV available upon request via email
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Send a Message</h3>
            <form onSubmit={handleSubmit} data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="+880 1234567890"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-300 mb-2">
                    Location/Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="City, Country"
                    data-testid="contact-address-input"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all"
                  placeholder="Your message or inquiry..."
                  data-testid="contact-comment-input"
                ></textarea>
              </div>

              {formStatus.message && (
                <div 
                  className={`mb-6 p-4 rounded-lg border ${
                    formStatus.type === 'success' 
                      ? 'bg-green-900/30 text-green-400 border-green-500/50' 
                      : 'bg-red-900/30 text-red-400 border-red-500/50'
                  }`}
                  data-testid="contact-form-status"
                >
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transform"
                data-testid="contact-submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Md. Masfiqur Rahman Nehal</h3>
              <p className="text-gray-400">Software Engineer | Frontend Developer (React)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('projects')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('skills')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Skills
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('education')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Education
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <p className="text-gray-400 mb-2">Email: masfiqur.nehal509@gmail.com</p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/masfiqur-nehal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/MasfiqurNehal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2026 Md. Masfiqur Rahman Nehal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;