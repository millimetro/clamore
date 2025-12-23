'use client';

import { useState, useEffect } from 'react';

interface GridOverlayProps {
  columns?: number;
  gutter?: number;
  color?: string;
  maxWidth?: number | string;
  opacity?: number;
  showLabels?: boolean;
  showMargins?: boolean;
  marginsWidth?: number;
  marginsColor?: string;
  marginsOpacity?: number;
}

export default function GridOverlay({ columns = 8, gutter = 0, color = 'red', maxWidth = 1900, opacity = 0.1, showLabels = true, showMargins = true, marginsWidth = 1380, marginsColor = 'red', marginsOpacity = 0.5 }: GridOverlayProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle grid with Cmd+G (Mac) or Ctrl+G (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  if (!isVisible) return null;

  // Convert color name to rgba
  const getColorWithOpacity = (opacityValue: number) => {
    const colorMap: Record<string, string> = {
      red: `rgba(255, 0, 0, ${opacityValue})`,
      blue: `rgba(0, 0, 255, ${opacityValue})`,
      green: `rgba(0, 255, 0, ${opacityValue})`,
      yellow: `rgba(255, 255, 0, ${opacityValue})`,
      white: `rgba(255, 255, 255, ${opacityValue})`,
      black: `rgba(0, 0, 0, ${opacityValue})`,
    };
    return colorMap[color] || `${color}${opacityValue === 1 ? '' : opacityValue * 100}`;
  };

  const borderOpacity = Math.min(opacity * 3, 1); // Border is 3x more opaque, max 1

  // Tailwind breakpoints
  const breakpoints = [
    { name: 'sm', px: 640, color: '#22c55e' },   // green
    { name: 'md', px: 768, color: '#3b82f6' },   // blue
    { name: 'lg', px: 1024, color: '#a855f7' },  // purple
    { name: 'xl', px: 1280, color: '#f59e0b' },  // orange
    { name: '2xl', px: 1536, color: '#ef4444' }, // red
  ];

  const getCurrentBreakpoint = () => {
    const width = viewportSize.width;
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
  };

  const currentBreakpoint = getCurrentBreakpoint();

  const maxWidthValue = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  const maxWidthLabel = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

  return (
    <>
      <div
        className="fixed inset-0 w-[95vw] border-x h-full pointer-events-none z-[9999]"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: maxWidthValue,
          borderColor: getColorWithOpacity(0.5),
          backgroundImage: `linear-gradient(
            to right,
            ${getColorWithOpacity(opacity)} 0%,
            ${getColorWithOpacity(opacity)} calc(100% - ${gutter}px - 1px),
            ${getColorWithOpacity(borderOpacity)} calc(100% - ${gutter}px - 1px),
            ${getColorWithOpacity(borderOpacity)} calc(100% - ${gutter}px),
            transparent calc(100% - ${gutter}px),
            transparent 100%
          )`,
          backgroundSize: `calc(100% / ${columns}) 100%`,
          backgroundRepeat: 'repeat-x',
        }}
      />
      {showMargins && (
        <div
          className="fixed inset-0 border-x h-full pointer-events-none z-[9999]"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${marginsWidth}px`,
            borderColor: marginsColor === 'red' 
              ? `rgba(255, 0, 0, ${marginsOpacity})` 
              : marginsColor === 'blue'
              ? `rgba(0, 0, 255, ${marginsOpacity})`
              : marginsColor === 'green'
              ? `rgba(0, 255, 0, ${marginsOpacity})`
              : `${marginsColor}`,
          }}
        />
      )}
      {showLabels && (
        <>
          <div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
            style={{
              fontSize: '10px',
              fontWeight: 'normal',
              fontFamily: 'monospace',
              color: 'white',
              backgroundColor: getColorWithOpacity(1),
              padding: '2px 6px',
              borderRadius: '6px',
            }}
          >
            max-w {maxWidthLabel}
          </div>
          <div
            className="fixed bottom-4 right-4 z-[10000] pointer-events-none"
            style={{
              fontSize: '10px',
              fontWeight: 'normal',
              fontFamily: 'monospace',
              color: 'white',
              backgroundColor: 'black',
              padding: '4px 8px',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{viewportSize.width}px x {viewportSize.height}px</div>
            <div style={{ display: 'flex', gap: '4px', fontSize: '11px', textTransform: 'uppercase' }}>
              <span style={{ 
                opacity: currentBreakpoint === 'xs' ? 1 : 0.4,
                color: currentBreakpoint === 'xs' ? '#64748b' : 'white'
              }}>
                xs
              </span>
              {breakpoints.map((bp) => (
                <span
                  key={bp.name}
                  style={{ 
                    opacity: currentBreakpoint === bp.name ? 1 : 0.4,
                    color: currentBreakpoint === bp.name ? bp.color : 'white'
                  }}
                >
                  {bp.name}:{bp.px}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

