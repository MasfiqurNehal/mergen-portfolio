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
    { name: "React", color: "bg-blue-500" },
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "Tailwind CSS", color: "bg-cyan-500" },
    { name: "HTML & CSS", color: "bg-orange-500" },
    { name: "TensorFlow", color: "bg-orange-600" },
    { name: "MySQL", color: "bg-blue-600" }
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              data-testid="nav-logo"
            >
              Nehal
            </button>
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills', 'education', 'research', 'about', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600'
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
      <header id="home" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6" data-testid="availability-badge">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                Available for Work
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" data-testid="hero-name">
                Md. Masfiqur Rahman Nehal
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6" data-testid="hero-title">
                Software Engineer | Frontend (React) | Web Development | AI / ML Enthusiast
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl" data-testid="hero-description">
                I build modern, responsive interfaces using React-style component patterns, with a strong focus on clean UI, performance, accessibility, and scalable frontend architecture. My work centers on frontend development (React) alongside applied AI/ML projects. I'm ready for corporate, multinational, fintech, and software engineering roles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  data-testid="cta-projects"
                >
                  Featured Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  data-testid="cta-contact"
                >
                  Contact Me
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://customer-assets.emergentagent.com/job_hii-hello-62/artifacts/3h91qb9z_profile.png" 
                alt="Md. Masfiqur Rahman Nehal - Software Engineer"
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl object-cover"
                data-testid="profile-image"
              />
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-16" data-testid="tech-stack-section">
            <p className="text-center text-gray-600 mb-6 font-medium">Technology Stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className={`px-6 py-2 ${tech.color} text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow`}
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
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="projects-heading">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A collection of my recent work showcasing frontend development expertise and problem-solving skills
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article 
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
                data-testid={`project-card-${index}`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`project-title-${index}`}>
                  {project.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{project.subtitle}</p>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-green-700 font-medium mb-4">✓ {project.impact}</p>
                <div className="flex gap-3">
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                    data-testid={`project-live-${index}`}
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg text-center font-medium hover:bg-gray-900 transition-colors"
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
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="skills-heading">
            Technical Skills
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive skill set spanning frontend development, AI/ML, and software engineering
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                data-testid={`skill-category-${index}`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Languages</h3>
            <p className="text-gray-700">Bengali (Native) • English (Professional)</p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="education-heading">
            Education
          </h2>
          <p className="text-gray-600 text-center mb-12">Academic background and achievements</p>
          <div className="max-w-4xl mx-auto space-y-6">
            <article className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-8 shadow-md border border-blue-100" data-testid="education-bsc">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Bachelor of Science (B.Sc) in Computer Science & Engineering
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">Daffodil International University</p>
                  <p className="text-gray-700 mb-1"><strong>CGPA:</strong> 3.65 / 4.00</p>
                  <p className="text-gray-600">Duration: 2022 – 2026</p>
                </div>
              </div>
            </article>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl p-6 shadow-md border border-gray-200" data-testid="education-hsc">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Higher Secondary Certificate (HSC)</h3>
                <p className="text-gray-700 mb-1"><strong>Group:</strong> Science</p>
                <p className="text-green-700 font-semibold">GPA: 5.00 / 5.00</p>
              </article>
              <article className="bg-white rounded-xl p-6 shadow-md border border-gray-200" data-testid="education-ssc">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secondary School Certificate (SSC)</h3>
                <p className="text-gray-700 mb-1"><strong>Group:</strong> Science</p>
                <p className="text-green-700 font-semibold">GPA: 5.00 / 5.00</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="research-heading">
            Research & AI Projects
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Applied AI/ML research and development projects
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {research.map((item, index) => (
              <article 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                data-testid={`research-item-${index}`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {item.type}
                  </span>
                  <span className="text-gray-600">{item.platform}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="about-heading">
            About Me
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 shadow-md">
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              I am a final-year Computer Science & Engineering undergraduate at <strong>Daffodil International University</strong> with a strong passion for <strong>frontend development</strong> using <strong>React</strong>. My expertise lies in building modern, responsive, and user-centric web applications with clean code and scalable architecture.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Beyond frontend development, I have a growing proficiency in <strong>full-stack development</strong> and <strong>AI/ML technologies</strong>, including machine learning, deep learning, and natural language processing. I actively work on applied AI projects and research, particularly in areas like NLP and computer vision.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              I maintain a <strong>clean code mindset</strong> and prioritize <strong>performance</strong>, <strong>accessibility</strong>, and <strong>user experience</strong> in every project. My work reflects a balance between aesthetic design and functional engineering.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              I am ready to contribute to professional software engineering teams in <strong>corporate</strong>, <strong>multinational</strong>, <strong>fintech</strong>, and <strong>startup environments</strong>, bringing dedication, problem-solving skills, and a collaborative mindset.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" data-testid="contact-heading">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-center mb-12">
            I'm available for professional opportunities. Feel free to reach out!
          </p>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <form onSubmit={handleSubmit} data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+880 1234567890"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location/Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, Country"
                    data-testid="contact-address-input"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Your message or inquiry..."
                  data-testid="contact-comment-input"
                ></textarea>
              </div>

              {formStatus.message && (
                <div 
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                  data-testid="contact-form-status"
                >
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                data-testid="contact-submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Direct Contact Options */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Direct Contact</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="mailto:masfiqur.nehal509@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                data-testid="contact-email-button"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Email
              </a>
              <a 
                href="https://www.linkedin.com/in/masfiqur-nehal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                data-testid="contact-linkedin-button"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href="https://github.com/MasfiqurNehal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                data-testid="contact-github-button"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
            <p className="text-center text-gray-600 mt-6 text-sm">
              CV available upon request via email
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Md. Masfiqur Rahman Nehal</h3>
              <p className="text-gray-400">Software Engineer | Frontend Developer (React)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('projects')} className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('skills')} className="text-gray-400 hover:text-white transition-colors">
                    Skills
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('education')} className="text-gray-400 hover:text-white transition-colors">
                    Education
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-2">Email: masfiqur.nehal509@gmail.com</p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/masfiqur-nehal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/MasfiqurNehal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Md. Masfiqur Rahman Nehal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;