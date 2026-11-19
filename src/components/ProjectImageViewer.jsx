import { useEffect } from "react";

const ProjectImageViewer = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  if (!images || images.length === 0) return null;

  const navBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.95)",
    border: "none",
    color: "#111",
    borderRadius: "50%",
    width: "52px",
    height: "52px",
    fontSize: "1.6rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
    transition: "background 0.2s, transform 0.2s",
    zIndex: 10001,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease"
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        .nav-btn:hover { background: white !important; transform: translateY(-50%) scale(1.1) !important; }
        .close-btn:hover { background: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* Close */}
      <button
        className="close-btn"
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff", borderRadius: "8px", width: "40px", height: "40px",
          fontSize: "1.1rem", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          transition: "background 0.2s", zIndex: 10001,
        }}
      >✕</button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="nav-btn"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{ ...navBtnStyle, left: "1.5rem" }}
        >‹</button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "85vw", maxHeight: "85vh", position: "relative" }}
      >
        <img
          src={images[currentIndex]}
          alt={`Preview ${currentIndex + 1}`}
          style={{
            maxWidth: "85vw", maxHeight: "80vh",
            borderRadius: "12px", objectFit: "contain",
            boxShadow: "0 0 80px rgba(0,255,127,0.1), 0 30px 80px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        />
        {/* Counter */}
        <div style={{
          position: "absolute", bottom: "-2rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
          color: "rgba(255,255,255,0.4)", letterSpacing: "2px", whiteSpace: "nowrap"
        }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="nav-btn"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{ ...navBtnStyle, right: "1.5rem" }}
        >›</button>
      )}
    </div>
  );
};

export default ProjectImageViewer;