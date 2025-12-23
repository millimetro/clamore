// Type definitions for GSAP Timeline Viewer

export interface TimelinePhase {
  name: string;
  start: number;
  duration: number;
  color: string;
  description: string;
  elements?: string[];
}

export interface AnimatedElement {
  name: string;
  selector: string;
  properties: string[];
  startTime: number;
  duration: number;
  color: string;
  easing?: EasingType;
  delay?: number;
}

export type EasingType = string; // GSAP supports many easing types, so we use string for flexibility

export type TimelinePosition = 'top-right' | 'top-left' | 'top' | 'bottom-right' | 'bottom-left' | 'bottom';

export interface GSAPTimelineViewerProps {
  timelineId?: string;
  className?: string;
  position?: TimelinePosition;
  phases?: TimelinePhase[];
  animatedElements?: AnimatedElement[];
  title?: string;
  autoAnalyze?: boolean;
}

export interface TimelineAnalysis {
  phases: TimelinePhase[];
  elements: AnimatedElement[];
}

export interface ElementIdentification {
  id: string;
  name: string;
}

export interface TimelineControlsProps {
  isPlaying: boolean;
  isScrubbing: boolean;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScrubStart: () => void;
  onScrubEnd: () => void;
  onScrub: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EasingCurveProps {
  animatedElements: AnimatedElement[];
  currentTime: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  hoveredElement?: string | null;
  onHoverElement?: (elementName: string | null) => void;
  focusedElement?: string | null;
}
