import React, { useEffect, useRef, useState } from "react";

export function LiquidBackground() {
  const blobRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const handlePreferenceChange = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches);
      setIsCoarsePointer(coarsePointerQuery.matches);
    };
    handlePreferenceChange();

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", handlePreferenceChange);
      coarsePointerQuery.addEventListener("change", handlePreferenceChange);
    } else {
      reducedMotionQuery.addListener(handlePreferenceChange);
      coarsePointerQuery.addListener(handlePreferenceChange);
    }

    return () => {
      if (typeof reducedMotionQuery.removeEventListener === "function") {
        reducedMotionQuery.removeEventListener("change", handlePreferenceChange);
        coarsePointerQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        reducedMotionQuery.removeListener(handlePreferenceChange);
        coarsePointerQuery.removeListener(handlePreferenceChange);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer) {
      if (blobRef.current) {
        blobRef.current.style.left = "50%";
        blobRef.current.style.top = "50%";
      }
      return;
    }

    let rafId = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const updateBlobPosition = () => {
      rafId = null;
      if (blobRef.current) {
        blobRef.current.style.left = `${pointerX}px`;
        blobRef.current.style.top = `${pointerY}px`;
      }
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateBlobPosition);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [prefersReducedMotion, isCoarsePointer]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#070b12] opacity-92" />
      <div
        ref={blobRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-r from-sky-400/25 to-violet-500/20 blur-[110px] mix-blend-screen ${
          prefersReducedMotion || isCoarsePointer ? "opacity-30" : "opacity-50"
        }`}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
}
