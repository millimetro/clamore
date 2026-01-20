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
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const logoButtonRef = useRef<HTMLAnchorElement>(null);

  useImperativeHandle(ref, () => ({
    setupAnimations: (tl: gsap.core.Timeline) => {
      // Get all nav elements to animate (excluding logo which is handled separately)
      const navElements = [
        manifestoButtonRef.current,
        edizioniButtonRef.current,
        contactButtonRef.current,
        socialLinksRef.current,
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
        });

        // Animate logo button first (if not on home page)
        tl.to(logoButtonRef.current, {
          opacity: 1,
          y: 0,
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

      if (socialLinksRef.current) {
        // Animate parent div first
        tl.to(socialLinksRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.inOut",
        }, "logo+=0.4");
        
        // Then animate individual links with stagger
        const socialLinks = socialLinksRef.current.querySelectorAll('a');
        if (socialLinks.length > 0) {
          tl.to(Array.from(socialLinks), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.inOut",
            stagger: 0.1,
          }, "logo+=0.4");
        }
      }
    },
  }), [isHomePage]);

  useGSAP(() => {
    // Set initial state immediately
    const navElements = [
      manifestoButtonRef.current,
      edizioniButtonRef.current,
      contactButtonRef.current,
      socialLinksRef.current,
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
      });
    }
  }, [isHomePage]);

  return (
    <>
      {/* Smart Logo - Top Center (only on non-home pages) */}
      {!isHomePage && (
        <a
          ref={logoButtonRef}
          href="/"
          className="fixed top-2 sm:top-4 md:top-4 left-1/2 z-30 inline-flex items-center justify-center cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-300"
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

      {/* Contatti Button - Bottom Left */}
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
        Contatti
      </a>

      {/* Social Links - Bottom Right */}
      <div ref={socialLinksRef} className="fixed bottom-2 sm:bottom-4 md:bottom-4 right-2 sm:right-4 md:right-4 z-30 flex items-center gap-3 sm:gap-4 md:gap-3" style={{ opacity: 0, transform: 'translateY(10px)' }}>
        <a
          href="https://www.instagram.com/clamore.festival/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Instagram"
        >
          <svg
            className="w-8 h-8 sm:w-5 sm:h-5 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#E84627' }}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="https://www.facebook.com/clamorebergamo/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Facebook"
        >
          <svg
            className="w-8 h-8 sm:w-5 sm:h-5 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#E84627' }}
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>
    </>
  );
});

Nav.displayName = "Nav";

export default Nav;
