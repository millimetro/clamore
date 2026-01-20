"use client";

import { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { gsap } from "gsap";
import type { Timeline } from "gsap";

export interface StatsSectionRef {
  setupAnimations: (tl: Timeline, position: string | number) => void;
}

interface StatsSectionProps {
  // No props needed - animations are controlled via ref
}

const StatsSection = forwardRef<StatsSectionRef, StatsSectionProps>((props, ref) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statYearRef = useRef<HTMLDivElement>(null);
  const statProjectsRef = useRef<HTMLDivElement>(null);
  const statMusiciansRef = useRef<HTMLDivElement>(null);
  const statProvincesRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setupAnimations: (tl: Timeline, position: string | number) => {
      // Get individual stat cards
      const statCards = [
        statYearRef.current,
        statProjectsRef.current,
        statMusiciansRef.current,
        statProvincesRef.current,
      ].filter(Boolean);

      // Set initial state for stat cards if not already set
      if (statCards.length > 0) {
        gsap.set(statCards, {
          opacity: 0,
          y: 20,
          scale: 0.8,
        });
      }

      // Animate stats with stagger and number counting
      if (statCards.length > 0) {
        tl.to(statCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.1,
        }, position);

        // Number counting animations
        if (statYearRef.current) {
          const yearElement = statYearRef.current.querySelector('.stat-number');
          if (yearElement) {
            const yearObj = { value: 0 };
            tl.to(yearObj, {
              value: 2017,
              duration: 1,
              ease: "expo.out",
              onUpdate: function() {
                yearElement.textContent = Math.floor(yearObj.value).toString();
              },
            }, position);
          }
        }

        if (statProjectsRef.current) {
          const projectsElement = statProjectsRef.current.querySelector('.stat-number');
          if (projectsElement) {
            const projectsObj = { value: 0 };
            const projectsPosition = typeof position === 'number' ? position + 0.1 : position;
            tl.to(projectsObj, {
              value: 700,
              duration: 1.2,
              ease: "expo.out",
              onUpdate: function() {
                projectsElement.textContent = Math.floor(projectsObj.value) + "+";
              },
            }, projectsPosition);
          }
        }

        if (statMusiciansRef.current) {
          const musiciansElement = statMusiciansRef.current.querySelector('.stat-number');
          if (musiciansElement) {
            const musiciansObj = { value: 0 };
            const musiciansPosition = typeof position === 'number' ? position + 0.2 : position;
            tl.to(musiciansObj, {
              value: 2000,
              duration: 1.4,
              ease: "expo.out",
              onUpdate: function() {
                musiciansElement.textContent = Math.floor(musiciansObj.value) + "+";
              },
            }, musiciansPosition);
          }
        }

        if (statProvincesRef.current) {
          const provincesElement = statProvincesRef.current.querySelector('.stat-number');
          if (provincesElement) {
            const provincesObj = { value: 0 };
            const provincesPosition = typeof position === 'number' ? position + 0.3 : position;
            tl.to(provincesObj, {
              value: 2,
              duration: 0.8,
              ease: "expo.out",
              onUpdate: function() {
                provincesElement.textContent = Math.floor(provincesObj.value).toString();
              },
            }, provincesPosition);
          }
        }
      }
    },
  }), []);

  // Set initial state immediately on mount
  useEffect(() => {
    const statCards = [
      statYearRef.current,
      statProjectsRef.current,
      statMusiciansRef.current,
      statProvincesRef.current,
    ].filter(Boolean);

    if (statCards.length > 0) {
      gsap.set(statCards, {
        opacity: 0,
        y: 20,
        scale: 0.8,
      });
    }
  }, []);

  return (
    <div ref={statsRef} className="mb-8 md:mb-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div ref={statYearRef} className="text-center" style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)' }}>
        <div className="stat-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-brand mb-2" style={{ color: '#E84627' }}>
          0
        </div>
        <div className="text-xs sm:text-sm md:text-base font-sans font-medium" style={{ color: '#E84627' }}>
          Anno di nascita
        </div>
      </div>
      <div ref={statProjectsRef} className="text-center" style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)' }}>
        <div className="stat-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-brand mb-2" style={{ color: '#E84627' }}>
          0+
        </div>
        <div className="text-xs sm:text-sm md:text-base font-sans font-medium" style={{ color: '#E84627' }}>
          Progetti ospitati
        </div>
      </div>
      <div ref={statMusiciansRef} className="text-center" style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)' }}>
        <div className="stat-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-brand mb-2" style={{ color: '#E84627' }}>
          0+
        </div>
        <div className="text-xs sm:text-sm md:text-base font-sans font-medium" style={{ color: '#E84627' }}>
          Musicisti
        </div>
      </div>
      <div ref={statProvincesRef} className="text-center" style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)' }}>
        <div className="stat-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-brand mb-2" style={{ color: '#E84627' }}>
          0
        </div>
        <div className="text-xs sm:text-sm md:text-base font-sans font-medium" style={{ color: '#E84627' }}>
          Province
        </div>
      </div>
    </div>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
