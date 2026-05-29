import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const media = import.meta.glob(
  "/src/assets/Personal/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
  {
    eager: true,
    import: "default",
  }
);

const videoExtensions = [
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".avi",
];

export function PersonalGrid() {
  const [loaded, setLoaded] = useState(false);
  const [activeItem, setActiveItem] = useState<{
    src: string;
    isVideo: boolean;
    alt: string;
  } | null>(null);

  const items = useMemo(() => Object.entries(media), []);

  useEffect(() => {
    // delay for smooth section-switch animation
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    if (activeItem) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  return (
    <div className={`masonry-wrapper ${loaded ? "show" : ""}`}>
      <div className="masonry">
        {items.map(([path, mod], index) => {
          const src = mod as string;
          const lowerPath = path.toLowerCase();
          const isVideo = videoExtensions.some((ext) => lowerPath.endsWith(ext));
          const alt = "personal";

          return (
            <div
              key={`${path}-${index}`}
              className="masonry-item"
              role="button"
              tabIndex={0}
              onClick={() => setActiveItem({ src, isVideo, alt })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveItem({ src, isVideo, alt });
                }
              }}
            >
              {isVideo ? (
                <video
                  src={src}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  aria-label="personal video"
                />
              ) : (
                <img src={src} alt={alt} loading="lazy" decoding="async" />
              )}
            </div>
          );
        })}
      </div>

      {activeItem && portalTarget &&
        createPortal(
          <div className="gallery-modal" role="dialog" aria-modal="true">
            <div
              className="gallery-modal-backdrop"
              onClick={() => setActiveItem(null)}
            />
            <div className="gallery-modal-media">
              <button
                className="gallery-modal-close"
                onClick={() => setActiveItem(null)}
                aria-label="Close"
              >
                X
              </button>
              {activeItem.isVideo ? (
                <video
                  src={activeItem.src}
                  muted
                  playsInline
                  controls
                  autoPlay
                  preload="auto"
                />
              ) : (
                <img src={activeItem.src} alt={activeItem.alt} />
              )}
            </div>
          </div>,
          portalTarget
        )}
    </div>
  );
}
