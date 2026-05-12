import { useEffect, useState } from "react";
import { ArrowLeft, User, Briefcase, Trophy, Camera } from "lucide-react";
import "./GalleryPage.css";

import { PersonalGrid } from "./gallery/PersonalGrid";
// import { ProjectsFeed } from "./gallery/ProjectsFeed";
// import { AchievementsFeed } from "./gallery/AchievementsFeed";
import { PhotographyFrames } from "./gallery/PhotographyFrames";

const videoExtensions = [
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".avi",
];

const personalMedia = Object.values(
  import.meta.glob(
    "/src/assets/Personal/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
    {
      eager: true,
      import: "default",
    }
  )
) as string[];

const photographyMedia = Object.values(
  import.meta.glob(
    "/src/assets/Photography/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
    {
      eager: true,
      import: "default",
    }
  )
) as string[];

function isVideoSource(src: string) {
  const lower = src.toLowerCase();
  return videoExtensions.some((ext) => lower.endsWith(ext));
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;

    if ("decode" in img) {
      img.decode().then(finish).catch(finish);
    }
  });
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = finish;
    video.onerror = finish;
    video.src = src;
    video.load();
  });
}

interface GalleryPageProps {
  theme: "light" | "dark";
  onBack: () => void; // parent callback
}

export function GalleryPage({ theme, onBack }: GalleryPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("personal");
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);

  /* FIXED useEffect */
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer); // proper cleanup
  }, []);

  useEffect(() => {
    let cancelled = false;
    const sources = [...personalMedia, ...photographyMedia];

    if (sources.length === 0) {
      setIsPreloaded(true);
      return undefined;
    }

    let completed = 0;
    const updateProgress = () => {
      completed += 1;
      if (!cancelled) {
        setPreloadProgress(Math.round((completed / sources.length) * 100));
      }
    };

    const tasks = sources.map((src) => {
      const task = isVideoSource(src) ? preloadVideo(src) : preloadImage(src);
      return task.then(updateProgress).catch(updateProgress);
    });

    Promise.all(tasks).then(() => {
      if (!cancelled) {
        setIsPreloaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [
    { key: "personal", name: "Personal Life", icon: User },
    // { key: "projects", name: "Projects & Work", icon: Briefcase },
    // { key: "achievements", name: "Achievements", icon: Trophy },
    { key: "photography", name: "Photography Lab", icon: Camera },
  ];

  if (!isPreloaded) {
    return (
      <div className="gallery-preload">
        <div className="gallery-preload-card">
          <h2 className="gallery-preload-title">Loading gallery</h2>
          <div className="gallery-preload-track">
            <div
              className="gallery-preload-bar"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
          <div className="gallery-preload-percent">{preloadProgress}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* NAVBAR */}
      <nav className="gallery-navbar">
        <h2
          className="gallery-title"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          My <span style={{ opacity: 1 }}>Collections</span>
        </h2>

        <div className="gallery-links">
          {categories.map((c) => (
            <p
              key={c.key}
              className={activeCategory === c.key ? "active-link" : ""}
              onClick={() => setActiveCategory(c.key)}
            >
              <c.icon size={18} style={{ marginRight: "6px" }} />
              {c.name}
            </p>
          ))}
        </div>

        {/* FIXED BACK BUTTON */}
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back To Portfolio
        </button>
      </nav>

      {/* CATEGORY BODY */}
      <section className="category-section animate">
        {activeCategory === "personal" && <PersonalGrid />}
        {/* {activeCategory === "projects" && <ProjectsFeed />}
        {activeCategory === "achievements" && <AchievementsFeed />} */}
        {activeCategory === "photography" && <PhotographyFrames />}
      </section>
    </div>
  );
}
