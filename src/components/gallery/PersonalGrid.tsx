import { useEffect, useMemo, useRef, useState } from "react";

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
  const preloadRefs = useRef<HTMLVideoElement[]>([]);

  const items = useMemo(() => Object.entries(media), []);
  const videoSources = useMemo(
    () =>
      items
        .map(([path, mod]) => {
          const src = mod as string;
          const lowerPath = path.toLowerCase();
          const isVideo = videoExtensions.some((ext) => lowerPath.endsWith(ext));

          return isVideo ? src : null;
        })
        .filter((src): src is string => Boolean(src)),
    [items]
  );

  useEffect(() => {
    // delay for smooth section-switch animation
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoSources.length === 0) {
      return;
    }

    preloadRefs.current = videoSources.map((src) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.load();
      return video;
    });

    return () => {
      preloadRefs.current.forEach((video) => {
        video.removeAttribute("src");
        video.load();
      });
      preloadRefs.current = [];
    };
  }, [videoSources]);

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
                  preload="auto"
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
                preload="auto"
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
