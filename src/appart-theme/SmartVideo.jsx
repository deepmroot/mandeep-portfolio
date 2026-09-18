import { useEffect, useRef } from "react";

// Video that only plays while visible, and never autoplays for
// reduced-motion users. Prevents several heavy promo videos from
// all downloading + playing simultaneously.
export default function SmartVideo({ src, poster, label, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    let observer;
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
        return undefined;
      }
      if (!("IntersectionObserver" in window)) return undefined;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(video);
    } catch (err) {
      // Play/pause is progressive enhancement — a static poster is fine.
    }
    return () => observer?.disconnect();
  }, []);

  const autoplay =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={autoplay}
      aria-label={label}
      className={className}
    />
  );
}
