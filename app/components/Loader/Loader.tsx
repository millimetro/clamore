"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { createLoaderAnimation } from "./anim";
import Image from "next/image";
import { useLoader } from "../../contexts/LoaderContext";

interface LoaderProps {
  onLoadingComplete?: () => void;
}


export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const { setLoaderComplete } = useLoader();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    setLoaderComplete(true);
    onLoadingComplete?.();
  };

  useGSAP(() => {
    if (!isMounted) return;
    createLoaderAnimation(
      logoRef,
      claimRef,
      progressBarRef,
      progressFillRef,
      containerRef,
      setProgress,
      setIsVisible,
      handleLoadingComplete
    );
  }, { scope: containerRef, dependencies: [isMounted] });

  if (!isMounted || !isVisible) return null;

  return (
    <div
      ref={containerRef}
      id="loaderContainer"
      data-loader="true"
      className="fixed h-dvh inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full h-full">
        {/* Logo */}
        <div 
          ref={logoRef}
          id="loaderLogo"
          className="flex items-center justify-center"
        >
          <Image 
            src="/logo/Logo_w.svg" 
            alt="Clamore Logo" 
            width={500}
            height={500}
            className="w-auto h-48 md:h-64 lg:h-80"
            priority
          />
        </div>

        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          className="flex flex-col items-center gap-2"
        >
          <div 
            id="progressBar"
            className="md:w-56 w-28 h-5 md:h-7 bg-white border-2 md:border-3 border-cream p-0 overflow-hidden rounded-full"
            style={{ boxShadow: "7px 7px 0px 0px var(--cream)" }}
          >
            <div
              ref={progressFillRef}
              id="progressFill"
              className="h-full bg-black rounded-full"
              style={{ width: "0%" }}
            >
            </div>
          </div>
          <div className="text-white font-bold font-brand text-xs md:text-base">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Claim Text */}
        <h2 
          ref={claimRef}
          id="loaderClaim"
          className="hidden md:block text-cream font-bold font-gambarino text-lg md:text-xl lg:text-2xl xl:text-3xl neobrutalist-text leading-none text-center"
        >
          {"Dal 2016, il tuo circolo a Bergamo".split("").map((char, index) => (
            <span key={index} className="char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
