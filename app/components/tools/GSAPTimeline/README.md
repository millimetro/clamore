# GSAP Timeline Viewer

A comprehensive React component for visualizing and debugging GSAP timelines with real-time analysis and easing curve visualization.

## 📁 Structure

```
GSAPTimeline/
├── components/                    # UI Components
│   ├── GSAPTimelineViewer.tsx   # Main component
│   ├── TimelineControls.tsx     # Play/pause/scrub controls
│   ├── EasingCurveVisualization.tsx # Easing curves chart
│   └── index.ts                 # Component exports
├── hooks/                       # Custom React Hooks
│   └── useTimeline.ts          # Timeline state management
├── utils/                       # Utility Functions
│   └── index.ts                # Analysis, easing, color utilities
├── types/                       # TypeScript Definitions
│   └── index.ts                # All interfaces and types
└── index.ts                     # Main exports
```

## 🚀 Usage

### Basic Usage
```tsx
import { GSAPTimelineViewer } from './components/tools/GSAPTimeline';

<GSAPTimelineViewer 
  timelineId="my-timeline"
  title="My Animation"
  autoAnalyze={true}
/>
```

### Advanced Usage
```tsx
import { 
  GSAPTimelineViewer,
  TimelineControls,
  useTimeline,
  analyzeTimeline 
} from './components/tools/GSAPTimeline';

// Use individual components
<TimelineControls 
  isPlaying={isPlaying}
  progress={progress}
  onPlay={handlePlay}
  // ... other props
/>

// Use custom hook
const { timeline, isPlaying, progress } = useTimeline('my-timeline', true);

// Use utilities
const analysis = analyzeTimeline(myTimeline);
```

## 🎯 Features

- **Real-time Timeline Analysis**: Automatically analyzes GSAP timelines
- **Interactive Controls**: Play, pause, restart, and scrub through animations
- **Easing Curve Visualization**: Visual representation of easing functions
- **Element Tracking**: Track individual animated elements
- **Collapsible Interface**: Compact mode for production use
- **GSAP Integration**: Uses GSAP's easing functions directly

## 🔧 API

### GSAPTimelineViewer Props
- `timelineId?: string` - ID of the GSAP timeline to analyze
- `className?: string` - Additional CSS classes
- `phases?: TimelinePhase[]` - Custom timeline phases
- `animatedElements?: AnimatedElement[]` - Custom animated elements
- `title?: string` - Component title
- `autoAnalyze?: boolean` - Enable automatic timeline analysis

### useTimeline Hook
Returns: `{ timeline, isPlaying, progress, duration, analyzedData }`

### Utilities
- `analyzeTimeline(tl)` - Analyze a GSAP timeline
- `generateEasingCurve(easingType)` - Generate easing curve points
- `getHexColor(tailwindColor)` - Convert Tailwind colors to hex
- `identifyElement(target)` - Identify DOM elements

## 🎨 Styling

The component uses Tailwind CSS classes and can be customized via the `className` prop. All colors and styling are defined in the utility functions.
