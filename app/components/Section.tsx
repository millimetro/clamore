"use client";

import { useEffect, useRef } from "react";

interface ButtonProps {
  href: string;
  text: string;
  borderColor: string;
  textColor: string;
  hoverBgClass: string; // e.g., "hover:bg-black"
  hoverTextClass: string; // e.g., "hover:text-red-500"
  target?: string;
  rel?: string;
}

interface SectionProps {
  id: string;
  bgColor: string;
  textColor: string;
  title: string | { type: "svg"; src: string; alt: string };
  description: string | React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean; // true = image left on desktop, false = image right on desktop
  button?: ButtonProps;
  imageBorderClass?: string; // e.g., "border-white" to override default border-black
  topBorderClass?: string; // e.g., "border-white" to override default border-black
}

export default function Section({
  id,
  bgColor,
  textColor,
  title,
  description,
  imageSrc,
  imageAlt,
  imageLeft = true,
  button,
  imageBorderClass,
  topBorderClass = "border-black",
}: SectionProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollProgress = -1;

    // Easing function for smooth animation
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const updateAnimation = () => {
      if (!imageContainerRef.current || !textContainerRef.current || !sectionRef.current) {
        rafId = requestAnimationFrame(updateAnimation);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 when section enters, 1 when fully scrolled)
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const rawProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / sectionHeight));
      
      // Apply easing for smoother motion
      const scrollProgress = easeOutCubic(rawProgress);
      
      // Only update if progress changed significantly (performance optimization)
      if (Math.abs(scrollProgress - lastScrollProgress) < 0.001) {
        rafId = requestAnimationFrame(updateAnimation);
        return;
      }
      lastScrollProgress = scrollProgress;
      
      // On mobile, keep simple layout (show image normally)
      if (window.innerWidth < 768) {
        if (imageContainerRef.current) {
          imageContainerRef.current.style.width = '100%';
        }
        if (textContainerRef.current) {
          textContainerRef.current.style.width = '100%';
        }
        rafId = requestAnimationFrame(updateAnimation);
        return;
      }
      
      // Text container: starts at 100% width, animates to 2/3 (66.67%)
      const textWidth = 100 - (scrollProgress * (100 / 3));
      textContainerRef.current.style.width = `${textWidth}%`;
      
      // Image container: starts at 0% width, animates to 1/3 (33.33%)
      const imageWidth = scrollProgress * (100 / 3);
      imageContainerRef.current.style.width = `${imageWidth}%`;
      
      rafId = requestAnimationFrame(updateAnimation);
    };

    // Start animation loop
    rafId = requestAnimationFrame(updateAnimation);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [imageLeft]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`sticky top-0 w-full h-[calc(100vh-6vh)] md:h-[calc(100vh-8vh)] ${bgColor} border-t ${topBorderClass} flex flex-col md:flex-row z-20`}
    >
      <div 
        ref={imageContainerRef}
        className={`w-full md:w-0 h-full overflow-hidden ${imageLeft ? "md:order-1 md:border-r-2 border-black" : "md:order-2"}`}
        style={{ willChange: 'width' }}
      >
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div 
        ref={textContainerRef}
        className={`w-full md:flex flex-col justify-center px-4 md:px-8 lg:px-12 ${imageLeft ? "md:order-2" : "md:order-1 md:border-r-2 border-black"}`}
        style={{ width: '100%', willChange: 'width' }}
      >
        {typeof title === "string" ? (
          <h2 className={`${textColor} font-bold font-brand text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] uppercase mb-4 md:mb-6 leading-none tracking-tighter`}>
            {title}
          </h2>
        ) : (
          <img src={title.src} alt={title.alt} className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] h-auto mb-4 md:mb-6" />
        )}
        <div className={`${textColor} font-bold font-gambarino tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-[1.1] md:leading-[1] mb-4`}>
          {description}
        </div>
        {button && (
          <a
            href={button.href}
            target={button.target}
            rel={button.rel}
            className={`inline-block mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 border-2 ${button.borderColor} rounded-full ${button.textColor} font-bold font-gambarino text-lg sm:text-xl md:text-2xl ${button.hoverBgClass} ${button.hoverTextClass} transition-colors duration-300 max-w-max`}
          >
            {button.text}
          </a>
        )}
      </div>
    </section>
  );
}

