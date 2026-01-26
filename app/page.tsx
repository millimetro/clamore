"use client";

import { useRef } from "react";
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

    // Get elements to animate after logo
    const otherElements = [
      dateRef.current,
      subscribeButtonRef.current,
      descriptionRef.current,
    ].filter(Boolean);

    // Set initial state immediately - logo starts hidden/scaled down, other elements hidden
    if (logoContainerRef.current) {
      gsap.set(logoContainerRef.current, {
        opacity: 0,
        scale: 0.5,
      });
    }

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

    if (subscribeButtonRef.current) {
      tl.to(subscribeButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.7");
    }
  }, { scope: mainContainerRef, dependencies: [isLoaderComplete] });

  return (
    <main ref={mainContainerRef} className="min-h-[100dvh] bg-cream snap-y snap-mandatory">
      <Nav ref={navRef} />
      
      <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-6 sm:gap-8 px-4 md:px-4 pt-20 sm:pt-24 md:pt-0 pb-20 sm:pb-24 md:pb-0">
        <div className="flex flex-col items-center gap-0">
          <div 
            ref={dateRef}
            className="font-brand text-center text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ color: '#E84627', opacity: 0, transform: 'translateY(10px)' }}
          >
            CLAMORE 2026
            <br />
            21-28 giugno 2026
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
          className="inline-flex items-center justify-center px-10 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-3 md:py-4 lg:py-5 rounded-full font-bold font-brand uppercase text-sm sm:text-sm md:text-base lg:text-lg border cursor-pointer bg-cream transition-all duration-300 hover:bg-[#E84627] hover:!text-cream -mt-2 sm:-mt-3"
          style={{ 
            borderColor: '#E84627',
            color: '#E84627',
            opacity: 0,
            transform: 'translateY(10px)'
          }}
        >
          iscriviti alla call!
        </a>
      </div>
    </main>
  );
}
