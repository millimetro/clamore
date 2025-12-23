"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ValuesSectionProps {
  text: string;
}

export default function ValuesSection({ text }: ValuesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Split text into words and characters, preserving word boundaries
  const splitTextIntoWordsAndChars = (text: string) => {
    // Split by spaces and newlines while preserving them
    const parts: Array<{ type: 'word' | 'space' | 'break'; chars: string[] }> = [];
    let currentWord: string[] = [];
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === ' ') {
        // Save current word if exists
        if (currentWord.length > 0) {
          parts.push({ type: 'word', chars: [...currentWord] });
          currentWord = [];
        }
        parts.push({ type: 'space', chars: [' '] });
      } else if (char === '\n') {
        // Save current word if exists
        if (currentWord.length > 0) {
          parts.push({ type: 'word', chars: [...currentWord] });
          currentWord = [];
        }
        parts.push({ type: 'break', chars: [] });
      } else {
        currentWord.push(char);
      }
    }
    
    // Don't forget the last word
    if (currentWord.length > 0) {
      parts.push({ type: 'word', chars: [...currentWord] });
    }
    
    return parts;
  };

  const textParts = splitTextIntoWordsAndChars(text);

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    if (!containerRef.current || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setIsVisible(true);
            hasAnimatedRef.current = true;
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    let rafId: number | null = null;
    let lastParallaxOffset = 0;

    const updateParallax = () => {
      if (!textRef.current || !containerRef.current) {
        rafId = requestAnimationFrame(updateParallax);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate parallax based on section's position in viewport
      // When section is at top of viewport, offset is 0
      // As section scrolls up, text moves down (parallax effect)
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate progress: 0 when section enters, 1 when section exits
      // Center the effect around the middle of the viewport
      const viewportCenter = windowHeight / 2;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;
      
      // Parallax speed (positive = moves down as you scroll up)
      const parallaxSpeed = 0.5;
      const parallaxOffset = distanceFromCenter * parallaxSpeed;

      // Only update if value changed significantly (performance optimization)
      if (Math.abs(parallaxOffset - lastParallaxOffset) < 0.1) {
        rafId = requestAnimationFrame(updateParallax);
        return;
      }

      lastParallaxOffset = parallaxOffset;
      
      // Apply parallax transform
      textRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      textRef.current.style.willChange = 'transform';

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useGSAP(() => {
    if (!textRef.current || !isVisible) return;

    // Get all character spans (letters and spaces) using the 'char' class
    const charsArray = Array.from(textRef.current.querySelectorAll('span.char')) as HTMLElement[];
    
    if (charsArray.length === 0) {
      console.warn('No character spans found for animation');
      return;
    }

    // Ensure initial state is set (in case inline styles weren't applied)
    gsap.set(charsArray, {
      opacity: 0,
      filter: "blur(10px)",
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate each character with stagger
    tl.to(charsArray, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        amount: 1.5,
        from: "start",
      },
    });
  }, { scope: containerRef, dependencies: [text, isVisible] });

  return (
    <section 
      ref={containerRef}
      id="values" 
      className="relative px-4 md:px-6 grid items-center justify-center h-screen py-12 md:py-24 w-full border-t-2 border-b-2 border-black z-20"
      style={{ background: 'radial-gradient(circle at center, rgb(168, 85, 247) 0%, rgb(168, 85, 247) 20%, #161616 35%)' }}
    >
      <div 
        ref={textRef}
        className="text-cream font-bold font-gambarino tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] md:leading-[1] max-w-6xl text-center"
      >
        {textParts.map((part, partIndex) => {
          if (part.type === 'space') {
            return (
              <span 
                key={partIndex} 
                className="char inline-block"
                style={{ opacity: 0, filter: 'blur(10px)' }}
              >
                &nbsp;
              </span>
            );
          }
          
          if (part.type === 'break') {
            return <br key={partIndex} />;
          }
          
          // For words, wrap in a container that keeps the word together (prevents breaking within word)
          return (
            <span key={partIndex} className="word-wrapper inline-block whitespace-nowrap">
              {part.chars.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block"
                  style={{ opacity: 0, filter: 'blur(10px)' }}
                >
                  {char}
                </span>
              ))}
            </span>
          );
        })}
      </div>
    </section>
  );
}

