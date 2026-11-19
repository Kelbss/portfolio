// src/PortFolio.jsx

import { useEffect, useRef, useState } from "react";

import "./PortFolio.css";
import profileImg from "./assets/images/profile.png";
import {
  FaLaravel, FaReact, FaSlack, FaTrello,
  FaArrowUp, FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaPhoneAlt, FaEnvelope,
} from "react-icons/fa";
import {
  SiGoogledrive, SiGoogledocs, SiGooglesheets,
  SiHtml5, SiCss, SiFlutter, SiPhp, SiFigma,
  SiClaude, SiGooglegemini, SiDeepseek,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { DiPhotoshop } from "react-icons/di";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";

// Path ng logo na <K/> para sa loading animation
const LOGO_PATH =
  "M38 22 L14 40 L38 58 " +          // <
  "M62 14 L62 66 " +                 // K (stem)
  "M98 14 L62 43 " +                 // K (upper arm)
  "M76 34 L100 66 " +                // K (leg)
  "M124 64 L142 16 " +               // /
  "M154 22 L178 40 L154 58";         // >

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState({});
  const [typed, setTyped] = useState("");
  const sectionRefs = useRef({});

  // Loading screen: hihintayin ang page load + minimum na oras para makita ang animation
  useEffect(() => {
    let cancelled = false;
    const minTime = new Promise((r) => setTimeout(r, 5000));
    const loaded = new Promise((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r, { once: true });
    });
    Promise.all([minTime, loaded]).then(() => {
      if (cancelled) return;
      setLeaving(true);
      setTimeout(() => !cancelled && setLoading(false), 700);
    });
    return () => { cancelled = true; };
  }, []);

  // Hintayin muna matapos ang intro bago magsimula ang hero animations
  useEffect(() => {
    document.body.classList.toggle("intro-playing", loading && !leaving);
    return () => document.body.classList.remove("intro-playing");
  }, [loading, leaving]);

  // I-lock ang scroll habang naka-loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  // Typewriter effect
  const roles = ["Frontend Developer", "Web Developer", "Mobile App Developer", "Creative Coder", "UI/UX Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setTyped(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowTop(window.scrollY > 400);
      const sections = ["home", "about", "skills", "services", "projects", "certifications", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // Malinis na URL (/about, /projects) sa halip na #about
  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `/${id}`);
  };

  // Kapag direktang binuksan ang /projects (o Back/Forward button), pumunta sa tamang section
  useEffect(() => {
    if (loading) return;
    const scrollToPath = () => {
      const id = window.location.pathname.replace("/", "");
      if (id && id !== "home") document.getElementById(id)?.scrollIntoView();
      else window.scrollTo({ top: 0 });
    };
    if (window.location.pathname !== "/") scrollToPath();
    window.addEventListener("popstate", scrollToPath);
    return () => window.removeEventListener("popstate", scrollToPath);
  }, [loading]);

  const designTools = [
    { name: "Adobe XD", icon: "adobexd" },
    { name: "Figma", icon: "figma" },
    { name: "Photoshop", icon: "photoshop" },
  ];

  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
  ];

  const skills = [
    { name: "PHP", icon: "php", color: "#7377AD" },
    { name: "HTML", icon: "html", color: "#E34F26" },
    { name: "CSS", icon: "css", color: "#1572B6" },
    { name: "Laravel", icon: "laravel", color: "#FF2D20" },
    { name: "Flutter", icon: "flutter", color: "#54C5F8" },
    { name: "React", icon: "react", color: "#61DAFB" },
  ];

  const aiTools = [
    { name: "Claude", icon: <SiClaude size={16} color="#D97757" /> },
    { name: "Gemini", icon: <SiGooglegemini size={16} color="#8E75B2" /> },
    { name: "ChatGPT", icon: <RiOpenaiFill size={16} color="#10A37F" /> },
    { name: "DeepSeek", icon: <SiDeepseek size={16} color="#4D6BFE" /> },
  ];

  const contactCards = [
    {
      label: "Email",
      value: "kelvinmacaraeg028@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=kelvinmacaraeg028@gmail.com",
      icon: <FaEnvelope size={18} />,
      external: true,
    },
    {
      label: "Phone",
      value: "0921 443 1051",
      href: "tel:09214431051",
      icon: <FaPhoneAlt size={18} />,
    },
  ];

  const socials = [
    { name: "Facebook", href: "https://www.facebook.com/kelbs.bautista28/", icon: <FaFacebookF size={20} /> },
    { name: "Instagram", href: "https://www.instagram.com/keeelbss/", icon: <FaInstagram size={20} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/bautista-kelvin-m-0313602a5/", icon: <FaLinkedinIn size={20} /> },
    { name: "GitHub", href: "https://github.com/Kelbss", icon: <FaGithub size={20} /> },
  ];

  const productivityTools = [
    { name: "Canva", icon: "canva" },
    { name: "Excel", icon: "excel" },
    { name: "Word", icon: "word" },
    { name: "PowerPoint", icon: "powerpoint" },
    { name: "Slack", icon: "slack" },
    { name: "Drive", icon: "drive" },
    { name: "Trello", icon: "trello" },
    { name: "Docs", icon: "docs" },
    { name: "Sheets", icon: "sheets" },
  ];

  const services = [
    { icon: "🎨", title: "UI/UX Design", desc: "Crafting clean and intuitive user experiences with a focus on aesthetics and usability that delight users." },
    { icon: "⚡", title: "Web Development", desc: "Building fast, responsive, and visually stunning web interfaces using React, Laravel and modern CSS." },
    { icon: "📱", title: "Mobile App Development", desc: "Developing cross-platform mobile applications with Flutter, delivering smooth native-like experiences." },
    { icon: "🖌️", title: "Graphic Design", desc: "Designing eye-catching flyers, promotional products, tarpaulins, and polo shirt prints that help brands stand out and get noticed." },
  ];

  return (
    <>
      {/* ── INTRO / LOADING SCREEN ── */}
      {loading && (
        <div className={`loader ${leaving ? "leaving" : ""}`} role="status" aria-label="Welcome intro">
          <svg className="loader-svg" viewBox="0 0 190 80" aria-hidden="true">
            <path className="loader-base" pathLength="100" d={LOGO_PATH} />
            <path className="loader-trace" pathLength="100" d={LOGO_PATH} />
            <path className="loader-laser" pathLength="100" d={LOGO_PATH} />
          </svg>
          <h2 className="loader-name">
            Kelvin <span>M. Bautista</span>
          </h2>
          <div className="loader-line" />
          <div className="loader-role">Web & Mobile Developer</div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="/home" className="logo" onClick={(e) => goTo(e, "home")}>
          <div>
            <div className="logo-mark">&lt;K/&gt;</div>
            <span className="logo-tag">portfolio</span>
          </div>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={activeSection === link.label.toLowerCase() ? "active" : ""}
                onClick={(e) => goTo(e, link.href.slice(1))}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-dot" title="Available for work" />

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={activeSection === link.label.toLowerCase() ? "active" : ""}
            onClick={(e) => { goTo(e, link.href.slice(1)); setMenuOpen(false); }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="home">
        <div className="hero">
          <div className="hero-bg-grid" />
          <div className="hero-glow" />
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-tag">Available for work</div>
              <h1 className="hero-name">
                Hi, I'm <span>Kelvin</span>
              </h1>
              <div className="hero-typed">
                {typed}<span className="cursor" />
              </div>
              <p className="hero-desc">
                I design and build clean, fast, and beautiful web experiences.
                Passionate about turning ideas into real digital products.
              </p>
              <div className="hero-btns">
                <a href="/projects" className="btn-primary" onClick={(e) => goTo(e, "projects")}>View Projects</a>
                <a href="/Kelvin-Bautista-CV.pdf" download="Kelvin-Bautista-CV.pdf" className="btn-outline">Download CV</a>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <div className="hero-photo-bubbles">
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
              </div>
              <div className="hero-photo-bg" />
              <img src={profileImg} alt="Kelvin M. Bautista" className="hero-photo" />
            </div>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>SCROLL</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section section-alt">
        <div
          id="about-head"
          ref={setRef("about-head")}
          className={`reveal ${visible["about-head"] ? "visible" : ""}`}
        >
          <div className="section-label">About Me</div>
          <h2 className="section-title">Who I <span>Am</span></h2>
        </div>

        <div className="about-grid">
          <div
            id="about-text"
            ref={setRef("about-text")}
            className={`about-text reveal reveal-delay-1 ${visible["about-text"] ? "visible" : ""}`}
          >
            <p>
              I'm <span>Kelvin M. Bautista</span>, a passionate and motivated developer with knowledge in building both websites and mobile applications. I enjoy creating modern and user-friendly projects while continuously improving my skills in technology and development.
            </p>
            <p>
              I also use <span>AI tools</span> to help improve my workflow, generate ideas, and build applications more efficiently. I believe technology is constantly evolving, so I'm always willing to learn new skills and adapt to the needs of the company or project I work with.
            </p>
            <p>
              As someone who loves exploring new ideas and solving problems, I'm open to opportunities where I can grow, contribute my current skills, and gain <span>real-world experience</span> in the tech industry.
            </p>

            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-num">10+</span>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <span className="stat-num">2+</span>
                <div className="stat-label">Years Exp.</div>
              </div>
              <div className="stat-card">
                <span className="stat-num">∞</span>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>

          <div
            id="about-avatar"
            ref={setRef("about-avatar")}
            className={`about-avatar reveal reveal-delay-2 ${visible["about-avatar"] ? "visible" : ""}`}
          >
            <div className="about-avatar-box-offset" />
            <div className="about-avatar-box">
              <img src={profileImg} alt="Kelvin M. Bautista" className="hero-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <div
          id="skills-head"
          ref={setRef("skills-head")}
          className={`reveal ${visible["skills-head"] ? "visible" : ""}`}
        >
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Skills & <span>Tools</span></h2>
          <p className="section-sub">Technologies and tools I use to bring ideas to life.</p>
        </div>

        <div
          id="skills-body"
          ref={setRef("skills-body")}
          className={`skills-section-inner reveal reveal-delay-1 ${visible["skills-body"] ? "visible" : ""}`}
        >
          <div className="skills-sub-label">— Core Technologies</div>
          <div className="skills-grid">
            {skills.map((s) => {
              const iconMap = {
                php: <SiPhp size={30} color="#7377AD" />,
                html: <SiHtml5 size={30} color="#E34F26" />,
                css: <SiCss size={30} color="#1572B6" />,
                laravel: <FaLaravel size={30} color="#FF2D20" />,
                flutter: <SiFlutter size={30} color="#54C5F8" />,
                react: <FaReact size={30} color="#61DAFB" />,
              };
              return (
                <div className="skill-chip" key={s.name}>
                  <span className="skill-chip-icon">{iconMap[s.icon]}</span>
                  <div className="skill-chip-name">{s.name}</div>
                </div>
              );
            })}
          </div>

          <div className="skills-sub-label">— AI Tools</div>
          <div className="tools-grid">
            {aiTools.map((t) => (
              <div className="tool-badge" key={t.name}>
                <span>{t.icon}</span>
                {t.name}
              </div>
            ))}
          </div>

          <div className="skills-sub-label">— Productivity & Collaboration</div>
          <div className="tools-grid">
            {productivityTools.map((t) => {
              const prodIconMap = {
                canva: (
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="canvaGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00C4CC" />
                        <stop offset="1" stopColor="#7D2AE8" />
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="12" fill="url(#canvaGrad)" />
                    <text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="sans-serif" fill="#fff">C</text>
                  </svg>
                ),
                excel: <span style={{ fontSize: "13px", fontWeight: "700", color: "#217346" }}>XLS</span>,
                word: <span style={{ fontSize: "13px", fontWeight: "700", color: "#2B579A" }}>DOC</span>,
                powerpoint: <span style={{ fontSize: "13px", fontWeight: "700", color: "#D24726" }}>PPT</span>,
                slack: <FaSlack size={16} color="#4A154B" />,
                drive: <SiGoogledrive size={16} color="#4285F4" />,
                trello: <FaTrello size={16} color="#0052CC" />,
                docs: <SiGoogledocs size={16} color="#4285F4" />,
                sheets: <SiGooglesheets size={16} color="#0F9D58" />,
              };
              return (
                <div className="tool-badge" key={t.name}>
                  <span>{t.icon ? prodIconMap[t.icon] : t.emoji}</span>
                  {t.name}
                </div>
              );
            })}
          </div>

          <div className="skills-sub-label">— UI/UX & Design</div>
          <div className="skills-grid">
            {designTools.map((t) => {
              const designIconMap = {
                adobexd: <span style={{ fontSize: "13px", fontWeight: "800", color: "#FF61F6", letterSpacing: "-0.5px" }}>XD</span>,
                figma: <SiFigma size={30} color="#F24E1E" />,
                photoshop: <DiPhotoshop size={30} color="#31A8FF" />,
              };
              return (
                <div className="skill-chip" key={t.name}>
                  <span className="skill-chip-icon">{designIconMap[t.icon]}</span>
                  <div className="skill-chip-name">{t.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section section-alt">
        <div
          id="services-head"
          ref={setRef("services-head")}
          className={`reveal ${visible["services-head"] ? "visible" : ""}`}
        >
          <div className="section-label">What I Do</div>
          <h2 className="section-title">My <span>Services</span></h2>
          <p className="section-sub">
            I offer a range of services focused on creating high-quality digital experiences from design to deployment.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              id={`svc-${i}`}
              ref={setRef(`svc-${i}`)}
              className={`service-card reveal reveal-delay-${i + 1} ${visible[`svc-${i}`] ? "visible" : ""}`}
            >
              <span className="service-num">0{i + 1}</span>
              <span className="service-icon">{s.icon}</span>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div
          id="projects-head"
          ref={setRef("projects-head")}
          className={`reveal ${visible["projects-head"] ? "visible" : ""}`}
        >
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-sub">
            A collection of projects I've built — from web apps to e-commerce platforms.
          </p>
        </div>

        <ProjectsSection visible={visible} setRef={setRef} />
      </section>

      {/* ── CERTIFICATIONS & AWARDS ── */}
      <section id="certifications" className="section section-alt">
        <div
          id="certs-head"
          ref={setRef("certs-head")}
          className={`reveal ${visible["certs-head"] ? "visible" : ""}`}
        >
          <div className="section-label">Achievements</div>
          <h2 className="section-title">Certifications & <span>Awards</span></h2>
          <p className="section-sub">
            Certificates and recognitions I've earned along my learning journey.
          </p>
        </div>

        <CertificationsSection visible={visible} setRef={setRef} />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-glow" />
        <div
          id="contact-body"
          ref={setRef("contact-body")}
          className={`contact-inner reveal ${visible["contact-body"] ? "visible" : ""}`}
        >
          <div className="section-label">Contact</div>
          <h2 className="contact-title">
            Let's Work <span>Together</span>
          </h2>
          <p className="contact-sub">
            Have a project in mind or just want to say hi? My inbox is always open. I'll get back to you as soon as possible!
          </p>

          <div className="contact-cards">
            {contactCards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="contact-card"
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="contact-card-icon">{c.icon}</span>
                <span className="contact-card-text">
                  <span className="contact-card-label">{c.label}</span>
                  <span className="contact-card-value">{c.value}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="contact-divider"><span>or find me on</span></div>

          <div className="contact-socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="social-btn"
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACK TO TOP ── */}
      <button
        className={`back-to-top ${showTop ? "show" : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/home");
        }}
        aria-label="Back to top"
        title="Back to top"
      >
        <FaArrowUp size={16} />
      </button>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">&lt;K/&gt;</div>
        <div className="footer-copy">© 2025 Kelvin M. Bautista. Built with React + Vite</div>
      </footer>
    </>
  );
};

export default Portfolio;