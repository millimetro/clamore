import { gsap } from "gsap";

// GSAP DevTools - solo in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
  });
}

export const createLoaderAnimation = (
  logoRef,
  claimRef,
  progressBarRef,
  progressFillRef,
  containerRef,
  setProgress,
  setIsVisible,
  onLoadingComplete
) => {
  if (!logoRef.current || !progressFillRef.current) return;

  const tl = gsap.timeline({
    id: "loader-timeline"
  });

  // Initial state - elements start hidden/scaled down
  gsap.set([logoRef.current, progressBarRef.current], {
    opacity: 0,
    y: 30,
    scale: 0.8
  });

  // Get all character spans from claim text
  const claimChars = claimRef.current ? Array.from(claimRef.current.querySelectorAll('span.char')) : [];
  
  // Set initial state for claim characters - elegant fade with subtle blur
  if (claimChars.length > 0) {
    gsap.set(claimChars, {
      opacity: 0,
      y: 10,
      filter: "blur(8px)"
    });
  }

  // Phase 1: Animate logo in with bounce
  tl.to(logoRef.current, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)"
  }, "phase1");

  // Phase 2: Animate progress bar in
  tl.to(progressBarRef.current, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    ease: "power2.out"
  }, "phase1+=0.4");

  // Phase 3: Animate progress bar fill from 0 to 100%
  tl.to(progressFillRef.current, {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: function() {
      const progressValue = Math.round(this.progress() * 100);
      setProgress(progressValue);
    }
  }, "phase1+=0.6");

  // Phase 3.5: Hide progress bar after it completes (with small delay)
  tl.to(progressBarRef.current, {
    opacity: 0,
    y: -10,
    duration: 0.4,
    ease: "power2.inOut"
  }, "phase1+=2.4"); // Small delay after progress bar completes (2.1 + 0.3 delay)

  // Phase 4: Animate claim text characters in with elegant stagger (after progress bar is hidden)
  if (claimChars.length > 0) {
    tl.to(claimChars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out",
      stagger: {
        amount: 1.2,
        from: "start"
      }
    }, "phase1+=2.9"); // Start after progress bar fade out (2.4 + 0.4 + 0.1 gap)
  }

  // Phase 5: Slide up and hide loader (after claim animation completes with delay)
  tl.to(containerRef.current, {
    yPercent: -100,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      setIsVisible(false);
      onLoadingComplete?.();
    }
  }, "phase1+=4.8"); // Start after claim animation completes with delay (2.9 start + 1.2 stagger + 0.7 delay)

  // Expose timeline globally for development debugging
  if (process.env.NODE_ENV === "development") {
    (window).loaderTimeline = tl;
  }
};
