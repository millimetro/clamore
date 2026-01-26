"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import WireframeSection from "./components/WireframeSection";
import Marquee from "./components/Marquee";
import ClamoreLogo from "./components/ClamoreLogo";
import Nav, { NavRef } from "./components/Nav";
import { useLoader } from "./contexts/LoaderContext";

export default function Home() {
  const dateRef = useRef<HTMLDivElement>(null);
  const subscribeButtonRef = useRef<HTMLAnchorElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);
  const navRef = useRef<NavRef>(null);
  const { isLoaderComplete } = useLoader();

  useGSAP(() => {
    if (!mainContainerRef.current) return;

    // Set initial state immediately - logo starts hidden/scaled down
    if (logoContainerRef.current) {
      gsap.set(logoContainerRef.current, {
        opacity: 0,
        scale: 0.5,
      });
    }

    // Set initial state for button with scale for dramatic entrance
    if (subscribeButtonRef.current) {
      gsap.set(subscribeButtonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
      });
    }

    // Set initial state for other elements
    const otherElements = [
      dateRef.current,
      descriptionRef.current,
    ].filter(Boolean);

    if (otherElements.length > 0) {
      gsap.set(otherElements, {
        opacity: 0,
        y: 10,
      });
    }

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      delay: isLoaderComplete ? 0.1 : 0, // Reduced delay
    });

    // Phase 1: Animate logo in first (loader-like entrance)
    if (logoContainerRef.current) {
      tl.to(logoContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.inOut",
      }, "logo");
    }

    // Setup nav animations on the same timeline
    if (navRef.current) {
      navRef.current.setupAnimations(tl);
    }

    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.4");
    }

    if (descriptionRef.current) {
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.6");
    }

    // Enhanced button entrance with bounce effect
    if (subscribeButtonRef.current) {
      tl.to(subscribeButtonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
      }, "logo+=0.7");

      // Add continuous subtle pulse animation after entrance
      tl.to(subscribeButtonRef.current, {
        scale: 1.03,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }, "logo+=1.4");
    }
  }, { scope: mainContainerRef, dependencies: [isLoaderComplete] });

  // Enhanced hover effects with GSAP
  useEffect(() => {
    const button = subscribeButtonRef.current;
    if (!button) return;

    let hoverTween: gsap.core.Tween | null = null;
    let leaveTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      // Kill any existing tweens
      if (leaveTween) leaveTween.kill();
      
      // Pause the pulse animation
      const pulseTween = gsap.getTweensOf(button).find(t => t.vars.repeat === -1);
      if (pulseTween) pulseTween.pause();

      // Create enhanced hover animation with scale and glow effect
      hoverTween = gsap.to(button, {
        scale: 1.08,
        filter: "drop-shadow(0 0 20px rgba(232, 70, 39, 0.6))",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Kill hover tween
      if (hoverTween) hoverTween.kill();
      
      // Return to normal state
      leaveTween = gsap.to(button, {
        scale: 1,
        filter: "drop-shadow(0 0 0px rgba(232, 70, 39, 0))",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          // Resume pulse animation
          const pulseTween = gsap.getTweensOf(button).find(t => t.vars.repeat === -1);
          if (pulseTween) pulseTween.resume();
        },
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTween) hoverTween.kill();
      if (leaveTween) leaveTween.kill();
    };
  }, [isLoaderComplete]);

  return (
    <main ref={mainContainerRef} className="min-h-[100dvh] bg-cream snap-y snap-mandatory">
      <Nav ref={navRef} />
      
      <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-6 sm:gap-8 px-4 md:px-4 pt-20 sm:pt-24 md:pt-0 pb-20 sm:pb-24 md:pb-0">
        <div className="flex flex-col items-center gap-0">
          <div 
            ref={dateRef}
            className="font-brand text-center text-lg md:text-2xl"
            style={{ color: '#E84627', opacity: 0, transform: 'translateY(10px)' }}
          >
            CLAMORE 2026
            <br />
            21 – 28 giugno 2026
          </div>
        </div>
        <div ref={logoContainerRef} style={{ opacity: 0, transform: 'scale(0.5)' }}>
          <ClamoreLogo />
        </div>
        <div 
          ref={descriptionRef}
          className="font-sans font-medium tracking-tight text-center text-xs sm:text-sm md:text-sm lg:text-base max-w-2xl leading-tight px-2"
          style={{ color: '#E84627', opacity: 0, transform: 'translateY(10px)' }}
        >
          <strong>Clamore Festival</strong> è un progetto ideato, organizzato e promosso da{" "}
          <a 
            href="https://www.inkclub.bergamo.it/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:no-underline font-bold cursor-pointer"
            style={{ color: '#E84627' }}
          >
            Ink Club APS
          </a>
          {" "}in collaborazione con diverse realtà di <strong>Bergamo</strong>, è nato nel 2017 con l'intento di valorizzare tutti i progetti musicali della città e della provincia.
        </div>
        <a
          ref={subscribeButtonRef}
          href="https://docs.google.com/forms/d/e/1FAIpQLSc_bOyAMuG3f6LLKNiPyD4XgtOz35hJsh3E8lz1fkJQfjEiow/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-3 md:py-4 lg:py-5 rounded-full font-bold font-brand uppercase text-sm sm:text-sm md:text-base lg:text-lg border md:border-2 cursor-pointer bg-cream transition-colors duration-300 hover:bg-[#E84627] hover:!text-cream -mt-2 sm:-mt-3 relative"
          style={{ 
            borderColor: '#E84627',
            color: '#E84627',
            opacity: 0,
            transform: 'translateY(20px) scale(0.8)',
            willChange: 'transform, opacity, filter'
          }}
        >
          <span className="relative z-10">iscriviti alla call!</span>
        </a>
      </div>
    </main>
  );
}
