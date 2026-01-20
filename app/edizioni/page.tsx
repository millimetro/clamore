"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "../contexts/LoaderContext";
import Nav, { type NavRef } from "../components/Nav";

const years = Array.from({ length: 9 }, (_, i) => 2017 + i).reverse(); // 2025 to 2017 (newest to oldest)

export default function EdizioniPage() {
  const navRef = useRef<NavRef>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { isLoaderComplete } = useLoader();

  useGSAP(() => {
    if (!mainContainerRef.current) return;

    if (carouselTrackRef.current) {
      gsap.set(carouselTrackRef.current, {
        opacity: 0,
        y: 20,
        xPercent: 0,
      });
    }

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      delay: isLoaderComplete ? 0.1 : 0,
    });

    // Add logo label for nav animations (they reference "logo" label)
    tl.addLabel("logo", 0);

    // Setup nav animations on the timeline
    if (navRef.current) {
      navRef.current.setupAnimations(tl);
    }

    // Animate carousel track
    if (carouselTrackRef.current) {
      tl.to(carouselTrackRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.5");
    }
  }, { scope: mainContainerRef, dependencies: [isLoaderComplete] });

  const goToSlide = (index: number) => {
    if (!carouselTrackRef.current) return;
    
    const newIndex = Math.max(0, Math.min(index, years.length - 1));
    setCurrentIndex(newIndex);
    
    const translateX = -newIndex * 100;
    gsap.to(carouselTrackRef.current, {
      xPercent: translateX,
      duration: 0.6,
      ease: "expo.inOut",
    });
  };

  const goToNext = () => {
    if (currentIndex < years.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < years.length - 1) {
        goToSlide(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < years.length - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <main ref={mainContainerRef} className="min-h-[100dvh] bg-cream flex flex-col items-center justify-start relative pb-20">
      <Nav ref={navRef} />

      <section className="px-3 sm:px-4 md:px-4 lg:px-8 mt-20 sm:mt-24 md:mt-32 mb-5 w-full max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div 
          ref={cardsContainerRef}
          className="relative w-full overflow-hidden min-h-[calc(100dvh-240px)] sm:min-h-[calc(100dvh-320px)]"
        >
          {/* Carousel Track */}
          <div 
            ref={carouselTrackRef}
            className="flex min-h-[calc(100dvh-240px)] sm:min-h-[calc(100dvh-320px)] touch-pan-y"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {years.map((year) => (
              <div
                key={year}
                className="year-card min-w-full px-4 sm:px-6 md:px-8 flex-shrink-0 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 md:gap-12 lg:gap-16"
              >
                {/* Year Display - Outside Card on Mobile, Inside Right Panel on Desktop */}
                <div className="mb-4 sm:mb-6 md:mb-0 md:hidden">
                  <span 
                    className="font-bold font-brand text-4xl sm:text-5xl md:text-6xl lg:text-7xl transition-colors duration-300"
                    style={{ color: '#E84627' }}
                  >
                    {year}
                  </span>
                </div>

                {/* Card with Image - Left on Desktop */}
                <div 
                  className="relative w-full max-w-sm sm:max-w-lg md:max-w-xs lg:max-w-sm md:w-auto h-full min-h-[calc(100dvh-240px)] sm:min-h-[calc(100dvh-320px)] md:h-auto md:aspect-[3/4] rounded-3xl overflow-hidden border-2 transition-all duration-300"
                  style={{ 
                    borderColor: '#E84627',
                    backgroundColor: 'rgba(232, 70, 39, 0.05)'
                  }}
                >
                  {/* Background Image */}
                  <img 
                    src="/foto/2025.jpg" 
                    alt={`Edizione ${year}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Photo Album Button - Inside Card on Mobile */}
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-4 sm:px-0 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 md:hidden z-10">
                    <a
                      href={year === 2025 ? "https://www.flickr.com/photos/201922523@N07/albums/72177720327178649/" : `/edizioni/${year}`}
                      target={year === 2025 ? "_blank" : undefined}
                      rel={year === 2025 ? "noopener noreferrer" : undefined}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold font-brand uppercase text-sm sm:text-base md:text-lg border-2 transition-all duration-300 hover:bg-[#E84627] hover:!text-cream cursor-pointer bg-cream"
                      style={{ 
                        borderColor: '#E84627',
                        color: '#E84627',
                      }}
                    >
                      guarda la gallery
                    </a>
                  </div>
                </div>

                {/* Year and Button - Right on Desktop, Hidden on Mobile */}
                <div className="hidden md:flex flex-col items-start justify-center gap-6 md:gap-8 md:w-1/2">
                  {/* Year Display */}
                  <div>
                    <span 
                      className="font-bold font-brand text-4xl sm:text-5xl md:text-5xl lg:text-6xl transition-colors duration-300"
                      style={{ color: '#E84627' }}
                    >
                      {year}
                    </span>
                  </div>
                  
                  {/* Photo Album Button */}
                  <div>
                    <a
                      href={year === 2025 ? "https://www.flickr.com/photos/201922523@N07/albums/72177720327178649/" : `/edizioni/${year}`}
                      target={year === 2025 ? "_blank" : undefined}
                      rel={year === 2025 ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold font-brand uppercase text-sm sm:text-base md:text-lg border-2 transition-all duration-300 hover:bg-[#E84627] hover:!text-cream cursor-pointer bg-cream"
                      style={{ 
                        borderColor: '#E84627',
                        color: '#E84627',
                      }}
                    >
                      guarda la gallery
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Arrows and Indicators */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-12 lg:mt-16">
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 bg-cream flex items-center justify-center transition-all duration-300 hover:bg-[#E84627] hover:!text-cream disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream disabled:hover:!text-[#E84627]"
              style={{ 
                borderColor: '#E84627',
                color: '#E84627',
              }}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="flex items-center gap-2 sm:gap-3">
              {years.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 sm:w-8' : ''
                  }`}
                  style={{ 
                    backgroundColor: index === currentIndex ? '#E84627' : 'rgba(232, 70, 39, 0.3)',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentIndex === years.length - 1}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 bg-cream flex items-center justify-center transition-all duration-300 hover:bg-[#E84627] hover:!text-cream disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream disabled:hover:!text-[#E84627]"
              style={{ 
                borderColor: '#E84627',
                color: '#E84627',
              }}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
