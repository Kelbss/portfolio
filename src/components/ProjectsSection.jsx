// src/components/ProjectSection.jsx
import { useState, useRef } from "react";
import ProjectImageViewer from "./ProjectImageViewer";

// ── Project images — update paths as you add more ──
import assignmentImg1 from "../assets/projects/StudentAssignmentTracker/1.png";
import assignmentImg2 from "../assets/projects/StudentAssignmentTracker/2.png";

import nikeImg1 from "../assets/projects/NikeEcommerce/1.png";
import nikeImg2 from "../assets/projects/NikeEcommerce/2.png";

import regattaImg1 from "../assets/projects/Regatta/1.png";
import regattaImg2 from "../assets/projects/Regatta/2.png";

import inventoryImg1 from "../assets/projects/Inventory System Bright Crop/1.png";
import inventoryImg2 from "../assets/projects/Inventory System Bright Crop/2.png";
import inventoryImg3 from "../assets/projects/Inventory System Bright Crop/3.png";
import inventoryImg4 from "../assets/projects/Inventory System Bright Crop/4.png";
import inventoryImg5 from "../assets/projects/Inventory System Bright Crop/5.png";



 // ── Mobile project images — update paths as you add more ──
import triviatapImg1 from "../assets/projects/Triviatap/1.jpg";
import triviatapImg2 from "../assets/projects/Triviatap/2.jpg";

import unitlyImg1 from "../assets/projects/Unitly/1.jpg";
import unitlyImg2 from "../assets/projects/Unitly/2.jpg";
import unitlyImg3 from "../assets/projects/Unitly/3.jpg";

// ── Web Design project images — update paths as you add more ──
import nikeAppImg1 from "../assets/projects/NikeApp/1.png";
import nikeAppImg2 from "../assets/projects/NikeApp/2.png";
import nikeAppImg3 from "../assets/projects/NikeApp/3.png";

import timpuyogImg1 from "../assets/projects/Timpuyog/1.png";
import timpuyogImg2 from "../assets/projects/Timpuyog/2.png";
import timpuyogImg3 from "../assets/projects/Timpuyog/3.png";

const WEB_DESIGN_PROJECTS = [
  {
    title: "Nike & New Balance E-Commerce",
    desc: "A mobile e-commerce app for Nike and New Balance products. Users can browse, checkout, and purchase items. Admins can manage products, update prices, and control listings via a dedicated dashboard.",
    tech: ["Adobe XD", "UI/UX Design"],
    badge: "Mobile Design",
    images: [nikeAppImg1, nikeAppImg2, nikeAppImg3],
  },
  {
    title: "Timpuyog App",
    desc: "A mobile landing and information app for the Timpuyog Performing Arts Guild of UEP. Users can view events, activities, meetings, and organization members all in one place.",
    tech: ["Adobe XD", "UI/UX Design"],
    badge: "Mobile Design",
    images: [timpuyogImg1, timpuyogImg2, timpuyogImg3],
  },
];


const MOBILE_PROJECTS = [
  {
    title: "Triviatap",
    desc: "A technology-themed quiz app where users can review topics like OS, computer parts, and tech history before taking quizzes. Supports multiple choice, true/false, and fill-in-the-blank formats with a score summary after each session.",
    tech: ["Android Studio", "Java", "XML"],
    badge: "Quiz App",
    images: [triviatapImg1, triviatapImg2],
  },
  {
    title: "Unitly",
    desc: "An Airbnb-style unit booking app built during OJT for a client. Guests can browse and book listings and pay via GCash QR. Hosts manage listings, approve bookings, and set custom pricing. Admins oversee approvals and listings.",
    tech: ["Flutter", "Dart", "Node.js"],
    badge: "Booking App",
    images: [unitlyImg1, unitlyImg2, unitlyImg3],
  },
];

const WEBSITE_PROJECTS = [
  {
    title: "Student Assignment Tracker",
    desc: "View and manage tasks & assignments with real-time scores. Students can track submitted answers and monitor their academic progress.",
    tech: ["PHP", "Bootstrap", "HTML"],
    badge: "Web App",
    images: [assignmentImg1, assignmentImg2],
  },
  {
    title: "Nike E-Commerce",
    desc: "Full e-commerce website with product management, user authentication, admin dashboard, and checkout system built around the Nike brand.",
    tech: ["PHP", "Bootstrap", "HTML", "JavaScript", "CSS"],
    badge: "E-Commerce",
    images: [nikeImg1, nikeImg2],
  },
  {
    title: "Regatta E-Commerce",
    desc: "Full-featured e-commerce platform for the Regatta brand with PayPal payment integration, user authentication, and a complete admin dashboard for managing all products.",
    tech: ["PHP", "MySQL", "JavaScript"],
    badge: "E-Commerce",
    images: [regattaImg1, regattaImg2],
  },

  {
    title: "Inventory System",
    desc: "Inventory system with Product Management, Warehouse, and Admin roles. Handles products, suppliers, purchase orders, returns, and stock movements per case or piece. Warehouse logs inbound and outbound with photos and a barcode scanner, while admins track activity through audit trails and export or print reports.",
    tech: ["React", "Vite", "JavaScript"],
    badge: "Inventory System",
    images: [inventoryImg1, inventoryImg2,inventoryImg3,inventoryImg4,inventoryImg5],
  },

];

// ── Single project card ──
const ProjectCard = ({ project, revealClass }) => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImg = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + project.images.length) % project.images.length }));
  const nextImg = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % project.images.length }));

  return (
    <>
      {lightbox.open && (
        <ProjectImageViewer
          images={project.images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}

      <div
        className={revealClass}
        style={{
          background: "var(--bg3)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px", overflow: "hidden", transition: "all 0.3s", cursor: "default"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "var(--green-border)";
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.35),0 0 24px rgba(0,255,127,0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Stacked image thumbnails */}
        <div
          style={{ position: "relative", height: "180px", background: "var(--bg4)", cursor: "pointer" }}
          onClick={() => openLightbox(0)}
        >
          {/* Stacked back images */}
          {project.images.slice(1).reverse().map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{
                position: "absolute",
                top: `${(project.images.length - 1 - i) * 6}px`,
                left: `${(project.images.length - 1 - i) * 6}px`,
                right: `${(project.images.length - 1 - i) * -6}px`,
                width: `calc(100% - ${(project.images.length - 1 - i) * 12}px)`,
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "8px 8px 0 0",
                opacity: 0.45 - i * 0.1,
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Front / main image */}
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              display: "block", borderRadius: "0"
            }}
          />

          {/* Hover overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.25s",
            borderRadius: "0"
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.45)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0)"}
          >
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.7rem",
              color: "#fff", letterSpacing: "2px", opacity: 0,
              transition: "opacity 0.25s", pointerEvents: "none"
            }}
              className="img-overlay-text"
            >VIEW IMAGES</span>
          </div>

          {/* Badge */}
          <div style={{
            position: "absolute", top: "0.7rem", right: "0.7rem",
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
            borderRadius: "6px", padding: "0.25rem 0.6rem",
            fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "var(--green)",
            border: "1px solid var(--green-border)", zIndex: 2
          }}>{project.badge}</div>

          {/* Image count pill */}
          {project.images.length > 1 && (
            <div style={{
              position: "absolute", bottom: "0.7rem", right: "0.7rem",
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
              borderRadius: "6px", padding: "0.2rem 0.5rem",
              fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
              color: "rgba(255,255,255,0.5)", zIndex: 2,
              display: "flex", alignItems: "center", gap: "4px"
            }}>
              🖼 {project.images.length}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "1.2rem 1.3rem 1.4rem" }}>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontWeight: "700",
            fontSize: "0.97rem", marginBottom: "0.5rem", color: "var(--white)"
          }}>{project.title}</div>
          <p style={{
            color: "var(--gray)", fontSize: "0.8rem", lineHeight: "1.7", marginBottom: "1rem"
          }}>{project.desc}</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {project.tech.map((tech) => (
              <span key={tech} style={{
                background: "var(--bg4)", border: "1px solid var(--green-border)",
                borderRadius: "5px", padding: "0.2rem 0.55rem",
                fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "var(--green)"
              }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ── Main exported section ──
const ProjectsSection = ({ visible, setRef }) => {
  const [activeTab, setActiveTab] = useState("Website");
  const tabs = ["Website", "Mobile Application", "Web & Mobile Design"];

  return (
    <>
      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {tabs.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              background: activeTab === cat ? "var(--green)" : "var(--bg3)",
              color: activeTab === cat ? "#000" : "var(--gray)",
              border: activeTab === cat ? "none" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px", padding: "0.5rem 1.3rem",
              fontFamily: "'Syne',sans-serif", fontWeight: "600", fontSize: "0.82rem",
              cursor: "pointer", letterSpacing: "0.4px", transition: "all 0.2s"
            }}
          >{cat}</button>
        ))}
      </div>

      <div
        id="projects-body"
        ref={setRef("projects-body")}
        className={`reveal reveal-delay-1 ${visible["projects-body"] ? "visible" : ""}`}
      >
        {activeTab === "Website" && (
          <>
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "var(--green)",
              letterSpacing: "3px", textTransform: "uppercase", opacity: 0.7,
              marginBottom: "1.4rem", display: "flex", alignItems: "center",
              gap: "10px", justifyContent: "center"
            }}>— Website Projects</div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.3rem", maxWidth: "1000px", margin: "0 auto"
            }}>
              {WEBSITE_PROJECTS.map((proj) => (
                <ProjectCard key={proj.title} project={proj} revealClass="" />
              ))}

              {/* Placeholder to fill row */}
              {WEBSITE_PROJECTS.length % 3 !== 0 &&
                Array(3 - (WEBSITE_PROJECTS.length % 3)).fill(0).map((_, i) => (
                  <div key={i} style={{
                    background: "var(--bg3)", border: "1px dashed rgba(255,255,255,0.06)",
                    borderRadius: "14px", height: "320px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: "0.6rem", color: "var(--gray2)"
                  }}>
                    <span style={{ fontSize: "2rem", opacity: 0.3 }}>🚧</span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", letterSpacing: "1px", opacity: 0.4 }}>Coming Soon</span>
                  </div>
                ))
              }
            </div>
          </>
        )}

        {activeTab === "Mobile Application" && (
  <>
    <div style={{
      fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "var(--green)",
      letterSpacing: "3px", textTransform: "uppercase", opacity: 0.7,
      marginBottom: "1.4rem", display: "flex", alignItems: "center",
      gap: "10px", justifyContent: "center"
    }}>— Mobile Application Projects</div>

    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3,1fr)",
      gap: "1.3rem", maxWidth: "1000px", margin: "0 auto"
    }}>
      {MOBILE_PROJECTS.map((proj) => (
        <ProjectCard key={proj.title} project={proj} revealClass="" />
      ))}

      {MOBILE_PROJECTS.length % 3 !== 0 &&
        Array(3 - (MOBILE_PROJECTS.length % 3)).fill(0).map((_, i) => (
          <div key={i} style={{
            background: "var(--bg3)", border: "1px dashed rgba(255,255,255,0.06)",
            borderRadius: "14px", height: "320px",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "0.6rem", color: "var(--gray2)"
          }}>
            <span style={{ fontSize: "2rem", opacity: 0.3 }}>🚧</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", letterSpacing: "1px", opacity: 0.4 }}>Coming Soon</span>
          </div>
        ))
      }
    </div>
  </>
)}

       {activeTab === "Web & Mobile Design" && (
  <>
    <div style={{
      fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "var(--green)",
      letterSpacing: "3px", textTransform: "uppercase", opacity: 0.7,
      marginBottom: "1.4rem", display: "flex", alignItems: "center",
      gap: "10px", justifyContent: "center"
    }}>— Web & Mobile Design Projects</div>

    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3,1fr)",
      gap: "1.3rem", maxWidth: "1000px", margin: "0 auto"
    }}>
      {WEB_DESIGN_PROJECTS.map((proj) => (
        <ProjectCard key={proj.title} project={proj} revealClass="" />
      ))}

      {WEB_DESIGN_PROJECTS.length % 3 !== 0 &&
        Array(3 - (WEB_DESIGN_PROJECTS.length % 3)).fill(0).map((_, i) => (
          <div key={i} style={{
            background: "var(--bg3)", border: "1px dashed rgba(255,255,255,0.06)",
            borderRadius: "14px", height: "320px",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "0.6rem", color: "var(--gray2)"
          }}>
            <span style={{ fontSize: "2rem", opacity: 0.3 }}>🚧</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", letterSpacing: "1px", opacity: 0.4 }}>Coming Soon</span>
          </div>
        ))
      }
    </div>
  </>
)}  
      </div>
    </>
  );
};

export default ProjectsSection;