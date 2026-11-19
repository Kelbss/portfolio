// src/components/CertificationsSection.jsx
import { useEffect, useRef, useState } from "react";
import ProjectImageViewer from "./ProjectImageViewer";

// Kinukuha lahat ng .png/.jpg/.jpeg sa src/assets/Certificate/ (1.png, 2.png, 4.jpg, etc.)
// Walang error kahit kulang o wala pang files, at hindi na kailangan mag-import isa-isa.
const files = import.meta.glob("../assets/Certificate/*.{png,jpg,jpeg,PNG,JPG,JPEG}", {
  eager: true,
  import: "default",
});

const CERTIFICATES = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], i) => ({
    src,
    title: `Certificate ${i + 1}`,
  }));

// Mobile detection (600px pababa)
const useIsMobile = (query = "(max-width: 600px)") => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return isMobile;
};

const CertificationsSection = ({ visible, setRef }) => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile();

  const touchX = useRef(null);
  const swiped = useRef(false);
  const resumeTimer = useRef(null);

  const images = CERTIFICATES.map((c) => c.src);
  const n = CERTIFICATES.length;

  const open = (index) => setLightbox({ open: true, index });
  const close = () => setLightbox({ open: false, index: 0 });
  const prev = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + n) % n }));
  const next = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % n }));

  // Auto-slide (mobile lang)
  useEffect(() => {
    if (!isMobile || paused || n < 2 || lightbox.open) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearInterval(id);
  }, [isMobile, paused, n, lightbox.open]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const go = (dir) => setActive((a) => (a + dir + n) % n);

  // Swipe handlers
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    swiped.current = false;
    clearTimeout(resumeTimer.current);
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  };

  const onCardClick = (i, d) => {
    if (swiped.current) return;
    if (d === 0) open(i);
    else setActive(i);
  };

  // Pinakamaikling distansya mula sa active card (para sa loop)
  const half = Math.floor(n / 2);
  const offsetOf = (i) => ((i - active + n + half) % n) - half;

  return (
    <>
      {lightbox.open && (
        <ProjectImageViewer
          images={images}
          currentIndex={lightbox.index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      <div
        id="certs-body"
        ref={setRef("certs-body")}
        className={`reveal reveal-delay-1 ${visible["certs-body"] ? "visible" : ""}`}
      >
        {n === 0 ? (
          <div className="cert-empty">
            <span>🏆</span>
            <p>Coming Soon</p>
          </div>
        ) : isMobile ? (
          /* ── MOBILE: auto-slide coverflow carousel ── */
          <>
            <div
              className="cert-carousel"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {CERTIFICATES.map((c, i) => {
                const d = offsetOf(i);
                const abs = Math.abs(d);
                return (
                  <button
                    key={c.src}
                    className={`cert-slide ${d === 0 ? "is-active" : ""}`}
                    style={{
                      transform: `translate(calc(-50% + ${d * 62}%), -50%) scale(${d === 0 ? 1 : 0.8})`,
                      opacity: abs === 0 ? 1 : abs === 1 ? 0.5 : 0,
                      zIndex: 10 - abs,
                      pointerEvents: abs > 1 ? "none" : "auto",
                    }}
                    onClick={() => onCardClick(i, d)}
                    aria-label={d === 0 ? `View ${c.title}` : `Go to ${c.title}`}
                  >
                    <img src={c.src} alt={c.title} draggable="false" />
                  </button>
                );
              })}
            </div>

            <div className="cert-dots">
              {CERTIFICATES.map((c, i) => (
                <button
                  key={c.src}
                  className={`cert-dot ${i === active ? "active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to certificate ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          /* ── LAPTOP / TABLET: grid ── */
          <div className="cert-grid">
            {CERTIFICATES.map((c, i) => (
              <button
                key={c.src}
                className="cert-card"
                onClick={() => open(i)}
                aria-label={`View ${c.title}`}
              >
                <img src={c.src} alt={c.title} loading="lazy" />
                <span className="cert-overlay">VIEW</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CertificationsSection;