import { useEffect, useMemo, useState } from "react";

const media = import.meta.glob(
  "/src/assets/Personal/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
  {
    eager: true,
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
    setTimeout(() => setLoaded(true), 80);
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

  return (
    <div className={`masonry-wrapper ${loaded ? "show" : ""}`}>
      <div className="masonry">
        {items.map(([path, mod], index) => {
          const src = (mod as { default: string }).default;
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
                <img src={src} alt={alt} loading="lazy" />
              )}
            </div>
          );
        })}
      </div>

      {activeItem && (
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
              />
            ) : (
              <img src={activeItem.src} alt={activeItem.alt} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
