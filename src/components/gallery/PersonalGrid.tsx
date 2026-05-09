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

  const items = useMemo(() => Object.entries(media), []);

  useEffect(() => {
    // delay for smooth section-switch animation
    setTimeout(() => setLoaded(true), 80);
  }, []);

  return (
    <div className={`masonry-wrapper ${loaded ? "show" : ""}`}>
      <div className="masonry">
        {items.map(([path, mod], index) => {
          const src = (mod as { default: string }).default;
          const lowerPath = path.toLowerCase();
          const isVideo = videoExtensions.some((ext) => lowerPath.endsWith(ext));

          return (
            <div key={`${path}-${index}`} className="masonry-item">
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
                <img src={src} alt="personal" loading="lazy" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
