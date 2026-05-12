import { useState, useEffect } from "react";
import IntroVideo from "./components/IntroVideo";
import { Navbar } from "./components/Navbar";
import { FloatingNav } from "./components/FloatingNav";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Team } from "./components/Team";
import Projects from "./components/Projects";
import { Gallery } from "./components/Gallery";
import { GalleryPage } from "./components/GalleryPage"; // <--- NEW PAGE IMPORT
import { Skills } from "./components/Skills";
import  Certificates from "./components/Certificates"; 
import { Resume } from "./components/Resume";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { ThemeToggle } from "./components/ThemeToggle";

const galleryVideoExtensions = [
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".avi",
];

const galleryPersonalMedia = Object.values(
  import.meta.glob(
    "/src/assets/Personal/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
    { eager: true, import: "default" }
  )
) as string[];

const galleryPhotographyMedia = Object.values(
  import.meta.glob(
    "/src/assets/Photography/*.{jpg,jpeg,png,gif,webp,heic,heif,mp4,mov,m4v,webm,avi}",
    { eager: true, import: "default" }
  )
) as string[];

const galleryMediaSources = [...galleryPersonalMedia, ...galleryPhotographyMedia];

function isGalleryVideo(src: string) {
  const lower = src.toLowerCase();
  return galleryVideoExtensions.some((ext) => lower.endsWith(ext));
}

function preloadGalleryImage(src: string) {
  const img = new Image();
  img.src = src;
  if ("decode" in img) {
    img.decode().catch(() => undefined);
  }
}

function preloadGalleryVideo(src: string) {
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.load();
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [introDone, setIntroDone] = useState(false);
  const [openGalleryPage, setOpenGalleryPage] = useState(false); // <--- NEW STATE

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (galleryMediaSources.length === 0 || typeof window === "undefined") {
      return;
    }

    let cancelled = false;
    const preloadAll = () => {
      if (cancelled) return;
      galleryMediaSources.forEach((src) => {
        if (isGalleryVideo(src)) {
          preloadGalleryVideo(src);
        } else {
          preloadGalleryImage(src);
        }
      });
    };

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(preloadAll, { timeout: 2000 });
      return () => {
        cancelled = true;
        if (win.cancelIdleCallback) {
          win.cancelIdleCallback(handle);
        }
      };
    }

    const timer = window.setTimeout(preloadAll, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen relative overflow-x-hidden transition-colors duration-300">

      {/* Navbar always visible */}
      {!openGalleryPage && (
        <>
          <Navbar />
          <FloatingNav />
        </>
      )}
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <main>
        {/* Show intro video first */}
        {!introDone && <IntroVideo onFinish={() => setIntroDone(true)} />}

        {/* AFTER INTRO */}
        {introDone && (
          <>
            {/* IF GALLERY PAGE IS OPEN — SHOW ONLY THAT */}
            {openGalleryPage ? (
              <GalleryPage theme={theme} onBack={() => setOpenGalleryPage(false)} />
            ) : (
              <>
                {/* OTHERWISE SHOW MAIN WEBSITE */}
                <Home theme={theme} />
                <About />
                <Team />
                <Projects />
                {/* PASS FUNCTION TO GALLERY BUTTON */}
                <Gallery theme={theme} onOpenGalleryPage={() => setOpenGalleryPage(true)} />
                <Skills />
                <Resume />
                <Certificates />
                {/* <Blog /> */}
                <Contact />
              </>
            )}
          </>
        )}
      </main>

      {/* Footer only when NOT in GalleryPage */}
      {!openGalleryPage && (
        <footer className="relative border-t border-gray-200 dark:border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-600 dark:text-white/60">
              © 2026 Harsha Kumar M R.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
