"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { TimelineAnalysis } from "../types";
import { analyzeTimeline } from "../utils";

// Custom hook for timeline management
export const useTimeline = (timelineId: string, autoAnalyze: boolean) => {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analyzedData, setAnalyzedData] = useState<TimelineAnalysis | null>(null);

  useEffect(() => {
    const findTimeline = () => {
      const tl = (window as any).loaderTimeline || gsap.getById(timelineId);
      if (tl) {
        setTimeline(tl);
        setDuration(tl.duration());
        
        if (autoAnalyze) {
          try {
            const analysis = analyzeTimeline(tl);
            setAnalyzedData(analysis);
          } catch (error) {
            console.warn("Errore nell'analisi automatica della timeline:", error);
          }
        }
      }
    };

    findTimeline();
    const interval = setInterval(findTimeline, 100);

    return () => clearInterval(interval);
  }, [timelineId, autoAnalyze]);

  useEffect(() => {
    if (!timeline) return;

    const updateProgress = () => {
      const currentProgress = timeline.progress();
      setProgress(currentProgress);
      setIsPlaying(!timeline.paused());
    };

    const ticker = setInterval(updateProgress, 16);

    timeline.eventCallback("onStart", () => setIsPlaying(true));
    timeline.eventCallback("onComplete", () => setIsPlaying(false));
    timeline.eventCallback("onPause" as any, () => setIsPlaying(false));

    return () => {
      clearInterval(ticker);
    };
  }, [timeline]);

  return { timeline, isPlaying, progress, duration, analyzedData };
};
