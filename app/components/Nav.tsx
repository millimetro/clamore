"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export interface NavRef {
  setupAnimations: (timeline: gsap.core.Timeline) => void;
}

const Nav = forwardRef<NavRef>((props, ref) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const manifestoButtonRef = useRef<HTMLAnchorElement>(null);
  const edizioniButtonRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const instagramButtonRef = useRef<HTMLAnchorElement>(null);
  const facebookButtonRef = useRef<HTMLAnchorElement>(null);
  const logoButtonRef = useRef<HTMLAnchorElement>(null);

  useImperativeHandle(ref, () => ({
    setupAnimations: (tl: gsap.core.Timeline) => {
      // Get all nav elements to animate (excluding logo which is handled separately)
      const navElements = [
        manifestoButtonRef.current,
        edizioniButtonRef.current,
        contactButtonRef.current,
        instagramButtonRef.current,
        facebookButtonRef.current,
      ].filter(Boolean);

      // Set initial state immediately
      if (navElements.length > 0) {
        gsap.set(navElements, {
          opacity: 0,
          y: 10,
        });
      }

      // Set logo initial state with proper centering
      if (logoButtonRef.current && !isHomePage) {
        gsap.set(logoButtonRef.current, {
          opacity: 0,
          xPercent: -50,
          y: 10,
          scale: 1,
        });

        // Animate logo button first (if not on home page)
        tl.to(logoButtonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "expo.inOut",
        }, "logo+=0.2");
      }

      // Phase 2: Animate nav buttons after logo (starts earlier, overlapping slightly)
      if (manifestoButtonRef.current && edizioniButtonRef.current) {
        tl.to([manifestoButtonRef.current, edizioniButtonRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.inOut",
          stagger: 0.1,
        }, "logo+=0.3");
      }

      if (contactButtonRef.current) {
        tl.to(contactButtonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.inOut",
        }, "logo+=0.4");
      }

      if (instagramButtonRef.current && facebookButtonRef.current) {
        tl.to([instagramButtonRef.current, facebookButtonRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.inOut",
          stagger: 0.1,
        }, "logo+=0.4");
      }
    },
  }), [isHomePage]);

  useGSAP(() => {
    // Set initial state immediately
    const navElements = [
      manifestoButtonRef.current,
      edizioniButtonRef.current,
      contactButtonRef.current,
      instagramButtonRef.current,
      facebookButtonRef.current,
    ].filter(Boolean);

    if (navElements.length > 0) {
      gsap.set(navElements, {
        opacity: 0,
        y: 10,
      });
    }

    // Set logo initial state with proper centering (if not on home page)
    if (logoButtonRef.current && !isHomePage) {
      gsap.set(logoButtonRef.current, {
        opacity: 0,
        xPercent: -50,
        y: 10,
        scale: 1,
      });

      // Add hover scale effect
      const logoElement = logoButtonRef.current;
      const handleMouseEnter = () => {
        gsap.to(logoElement, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
        });
      };
      const handleMouseLeave = () => {
        gsap.to(logoElement, {
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      logoElement.addEventListener("mouseenter", handleMouseEnter);
      logoElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        logoElement.removeEventListener("mouseenter", handleMouseEnter);
        logoElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isHomePage]);

  return (
    <>
      {/* Smart Logo - Top Center (only on non-home pages) */}
      {!isHomePage && (
        <a
          ref={logoButtonRef}
          href="/"
          className="fixed top-2 sm:top-4 md:top-4 left-1/2 z-30 inline-flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 origin-center"
          style={{ 
            opacity: 0,
            transform: 'translateX(-50%) translateY(10px)'
          }}
        >
          <img 
            src="/logo/smart.svg" 
            alt="Clamore Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto"
          />
        </a>
      )}

      {/* Manifesto Button - Left Side */}
      <a
        ref={manifestoButtonRef}
        href="/manifesto"
        className="fixed left-2 sm:left-4 md:left-4 top-2 sm:top-4 md:top-4 z-30 inline-flex items-center justify-center w-[140px] sm:w-[160px] md:w-[200px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold font-brand uppercase text-xs sm:text-sm md:text-base border md:border-2 transition-all duration-300 bg-cream hover:bg-[#E84627] hover:!text-cream cursor-pointer"
        style={{ 
          borderColor: '#E84627',
          color: '#E84627',
          opacity: 0,
          transform: 'translateY(10px)'
        }}
      >
        Manifesto
      </a>

      {/* Edizioni Button - Right Side */}
      <a
        ref={edizioniButtonRef}
        href="/edizioni"
        className="fixed right-2 sm:right-4 md:right-4 top-2 sm:top-4 md:top-4 z-30 inline-flex items-center justify-center w-[140px] sm:w-[160px] md:w-[200px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold font-brand uppercase text-xs sm:text-sm md:text-base border md:border-2 transition-all duration-300 bg-cream hover:bg-[#E84627] hover:!text-cream cursor-pointer"
        style={{ 
          borderColor: '#E84627',
          color: '#E84627',
          opacity: 0,
          transform: 'translateY(10px)'
        }}
      >
        Edizioni
      </a>

      {/* Contattaci Button - Bottom Left */}
      <a
        ref={contactButtonRef}
        href="mailto:clamore.bergamo@gmail.com"
        className="fixed bottom-2 sm:bottom-4 md:bottom-4 left-2 sm:left-4 md:left-4 z-30 inline-flex items-center justify-center w-[140px] sm:w-[160px] md:w-[200px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold font-brand uppercase text-xs sm:text-sm md:text-base border md:border-2 transition-all duration-300 bg-cream hover:bg-[#E84627] hover:!text-cream cursor-pointer"
        style={{ 
          borderColor: '#E84627',
          color: '#E84627',
          opacity: 0,
          transform: 'translateY(10px)'
        }}
      >
        Contattaci
      </a>

      {/* Social Buttons - Bottom Right */}
      <div className="fixed bottom-2 sm:bottom-4 md:bottom-4 right-2 sm:right-4 md:right-4 z-30 flex items-center gap-1 sm:gap-1.5 md:gap-2">
        {/* Facebook Button */}
        <a
          ref={facebookButtonRef}
          href="https://www.facebook.com/clamorebergamo/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-[70px] sm:w-[80px] md:w-[100px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold font-brand uppercase text-xs sm:text-sm md:text-base border md:border-2 transition-all duration-300 bg-cream hover:bg-[#E84627] hover:!text-cream cursor-pointer"
          style={{ 
            borderColor: '#E84627',
            color: '#E84627',
            opacity: 0,
            transform: 'translateY(10px)'
          }}
        >
          FB
        </a>

        {/* Instagram Button */}
        <a
          ref={instagramButtonRef}
          href="https://www.instagram.com/clamore.festival/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-[70px] sm:w-[80px] md:w-[100px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold font-brand uppercase text-xs sm:text-sm md:text-base border md:border-2 transition-all duration-300 bg-cream hover:bg-[#E84627] hover:!text-cream cursor-pointer"
          style={{ 
            borderColor: '#E84627',
            color: '#E84627',
            opacity: 0,
            transform: 'translateY(10px)'
          }}
        >
          IG
        </a>
      </div>
    </>
  );
});

Nav.displayName = "Nav";

export default Nav;
