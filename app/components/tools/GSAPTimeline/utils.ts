import { gsap } from "gsap";
import { TimelinePhase, AnimatedElement, TimelineAnalysis, ElementIdentification } from "./types";

// Constants
export const PHASE_COLORS = ["bg-cyan-500", "bg-emerald-500", "bg-rose-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
export const ELEMENT_COLORS = ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-orange-400", "bg-red-400", "bg-yellow-400"];

// Element identification utility
export const identifyElement = (target: any, index: number): ElementIdentification => {
  // Solo ID, nessuna classe CSS mostrata
  if (target.id) {
    return {
      id: target.id,
      name: target.id.replace('Ref', '').replace(/([A-Z])/g, ' $1').trim()
    };
  }
  
  // Fallback: "Elemento X" invece delle classi
  return {
    id: `elemento-${index + 1}`,
    name: `Elemento ${index + 1}`
  };
};

// Timeline analysis utility
export const analyzeTimeline = (tl: gsap.core.Timeline): TimelineAnalysis => {
  const phases: TimelinePhase[] = [];
  const elements: AnimatedElement[] = [];
  const processedElements = new Set<string>();
  
  let phaseIndex = 0;
  let elementIndex = 0;
  
  const tweens = tl.getChildren();
  
  tweens.forEach((tween: any, index: number) => {
    const startTime = tween.startTime();
    const duration = tween.duration();
    const targets = tween.targets();
    const ease = tween.vars?.ease || "power2.out";
    
    // Create phase for significant tweens
    if (duration > 0.1) {
      const phaseName = tween.vars?.label || `Phase ${phaseIndex + 1}`;
      phases.push({
        name: phaseName,
        start: startTime,
        duration: duration,
        color: PHASE_COLORS[phaseIndex % PHASE_COLORS.length],
        description: `Animation phase ${phaseIndex + 1}`,
        elements: targets?.map((target: any) => {
          // Solo ID, nessuna classe CSS mostrata
          if (target.id) return target.id;
          return `elemento-${index + 1}`;
        }) || [`elemento-${index + 1}`]
      });
      phaseIndex++;
    }
    
    // Analyze each target
    if (targets) {
      targets.forEach((target: any, targetIndex: number) => {
        const { id: elementId, name: elementName } = identifyElement(target, elementIndex);
        
        if (processedElements.has(elementId)) return;
        processedElements.add(elementId);
        
        const properties = Object.keys(tween.vars || {});
        const animProperties = properties.filter(prop => 
          !['onUpdate', 'onComplete', 'onStart', 'ease', 'duration', 'delay', 'stagger', 'label'].includes(prop)
        );
        
        if (animProperties.length > 0) {
          elements.push({
            name: elementName,
            selector: elementId,
            properties: animProperties,
            startTime: startTime,
            duration: duration,
            color: ELEMENT_COLORS[elementIndex % ELEMENT_COLORS.length],
            easing: typeof ease === 'string' ? (ease as any) : 'power2.out'
          });
          elementIndex++;
        }
      });
    }
  });
  
  return { phases, elements };
};

// Progress curve generation - shows animation progress from 0% to 100% with horizontal extension
export const generateProgressCurve = (
  easingType: string,
  width: number = 100,
  height: number = 40,
  extensionLength: number = 20
): string => {
  const points: { x: number; y: number }[] = [];
  const steps = 50;

  // Generate the main curve
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    
    // Use GSAP's easing function to get progress value
    let progress = 0;
    try {
      const easingFunc = gsap.parseEase(easingType);
      if (typeof easingFunc === 'function') {
        progress = easingFunc(t);
      }
    } catch (error) {
      // Fallback to linear if easing is not recognized
      console.warn(`Unknown easing type: ${easingType}, falling back to linear`);
      progress = t;
    }

    const x = (i / steps) * width;
    // Progress goes from 0% (bottom) to 100% (top)
    const y = height - progress * height;
    points.push({ x, y });
  }

  // Add horizontal extension to maintain final value
  const finalProgress = gsap.parseEase(easingType)(1);
  const finalY = height - finalProgress * height;
  
  for (let i = 1; i <= extensionLength; i++) {
    points.push({ x: width + i, y: finalY });
  }

  return points.map((p) => `${p.x},${p.y}`).join(" ");
};

// Easing curve generation using GSAP's easing functions
export const generateEasingCurve = (
  easingType: string,
  width: number = 100,
  height: number = 40
): string => {
  const points: { x: number; y: number }[] = [];
  const steps = 50;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    
    // Use GSAP's easing function directly
    let easedT = t;
    try {
      // Try to get the easing function from GSAP
      const easingFunc = gsap.parseEase(easingType);
      if (typeof easingFunc === 'function') {
        easedT = easingFunc(t);
      }
    } catch (error) {
      // Fallback to linear if easing is not recognized
      console.warn(`Unknown easing type: ${easingType}, falling back to linear`);
      easedT = t;
    }

    const x = (i / steps) * width;
    const y = height - easedT * height;
    points.push({ x, y });
  }

  return points.map((p) => `${p.x},${p.y}`).join(" ");
};

// Color utilities
export const getHexColor = (tailwindColor: string): string => {
  const colorMap: { [key: string]: string } = {
    "bg-blue-400": "#60a5fa",
    "bg-purple-400": "#a78bfa",
    "bg-green-400": "#4ade80",
    "bg-orange-400": "#fb923c",
    "bg-cyan-500": "#06b6d4",
    "bg-emerald-500": "#10b981",
    "bg-rose-500": "#f43f5e",
  };
  return colorMap[tailwindColor] || "#6b7280";
};
