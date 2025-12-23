"use client";

import { gsap } from "gsap";
import { EasingCurveProps } from "../types";
import { generateEasingCurve, getHexColor } from "../utils";

export const EasingCurveVisualization = ({ 
  animatedElements, 
  currentTime, 
  isCollapsed = false, 
  onToggleCollapse,
  hoveredElement,
  onHoverElement,
  focusedElement
}: EasingCurveProps) => {
  
  return (
  <div className={`border-t border-gray-700/50 ${isCollapsed ? 'py-2 px-4' : 'p-4'}`}>
    <div className={`flex items-center justify-between ${isCollapsed ? 'mb-0' : 'mb-3'}`}>
      <span className="px-1.5 py-0.5 bg-amber-900/30 text-amber-300 text-[10px] font-mono rounded border border-amber-700/30">
        Easing Curves
      </span>
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center w-5 h-5 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
          title={isCollapsed ? "Expand Easing Curves" : "Collapse Easing Curves"}
        >
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>

    {!isCollapsed && (
      <>
        <div className="w-full aspect-square bg-gray-900 border border-gray-700 rounded overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        className="w-full h-full"
      >
        {/* Grid */}
        <defs>
          <pattern
            id="mainGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#374151"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="subGrid"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 4 0 L 0 0 0 4"
              fill="none"
              stroke="#4b5563"
              strokeWidth="0.25"
            />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#mainGrid)" />
        <rect width="400" height="400" fill="url(#subGrid)" />

        {/* Main axes */}
        <line
          x1="20"
          y1="380"
          x2="380"
          y2="380"
          stroke="#6b7280"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="380"
          stroke="#6b7280"
          strokeWidth="2"
        />

        {/* Axis labels */}
        <text
          x="200"
          y="395"
          textAnchor="middle"
          className="text-[8px] fill-gray-400 font-mono"
        >
          Time (0 → 1)
        </text>
        <text
          x="10"
          y="200"
          textAnchor="middle"
          className="text-[8px] fill-gray-400 font-mono"
          transform="rotate(-90 10 200)"
        >
          Progress (0 → 1)
        </text>

        {/* Grid lines */}
        <line
          x1="20"
          y1="20"
          x2="380"
          y2="20"
          stroke="#6b7280"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        <line
          x1="20"
          y1="200"
          x2="380"
          y2="200"
          stroke="#6b7280"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        <line
          x1="200"
          y1="20"
          x2="200"
          y2="380"
          stroke="#6b7280"
          strokeWidth="1"
          strokeDasharray="2,2"
        />

        {/* Easing curves */}
        {animatedElements.map((element, index) => {
          if (!element.easing) return null;

          // Calcola offset verticale per evitare sovrapposizioni
          const totalElements = animatedElements.filter(el => el.easing).length;
          const verticalOffset = totalElements > 1 ? (index * 4) % 8 : 0; // Offset ciclico di max 8px
          const curveHeight = totalElements > 1 ? 144 : 152; // Riduce altezza se ci sono più curve
          
          const curvePoints = generateEasingCurve(element.easing, 360, 360);
          const color = getHexColor(element.color);
          const isActive =
            currentTime >= element.startTime &&
            currentTime <= element.startTime + element.duration;
          
          // Mostra solo la curva hovered/focused o tutte se nessuna è hovered/focused
          const shouldShow = (!hoveredElement || hoveredElement === element.name) && 
                            (!focusedElement || focusedElement === element.name);

          return (
            <g key={index} opacity={shouldShow ? 1 : 0.2}>
              <polyline
                points={curvePoints}
                fill="none"
                stroke={color}
                strokeWidth="2"
                transform={`translate(20, ${20 + verticalOffset})`}
                opacity="0.8"
              />
              
              {/* Curve identifier dot */}
              <circle
                cx="30"
                cy={30 + verticalOffset}
                r="3"
                fill={color}
                opacity="0.9"
              />

              {/* Real-time position indicator */}
              {isActive &&
                (() => {
                  const elementProgress = Math.max(
                    0,
                    Math.min(
                      1,
                      (currentTime - element.startTime) / element.duration
                    )
                  );
                  let easedProgress = elementProgress;

                  // Calcola la posizione eased usando GSAP
                  if (element.easing) {
                    try {
                      const easingFunc = gsap.parseEase(element.easing);
                      if (typeof easingFunc === 'function') {
                        easedProgress = easingFunc(elementProgress);
                      }
                    } catch (error) {
                      // Fallback to linear if easing is not recognized
                      easedProgress = elementProgress;
                    }
                  }

                  const x = 20 + elementProgress * 360;
                  const y = 20 + verticalOffset + 360 - easedProgress * 360;

                  return (
                    <g>
                      {/* Glow effect */}
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill={color}
                        opacity="0.3"
                      />
                      {/* Main indicator */}
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill="white"
                        stroke={color}
                        strokeWidth="1"
                      />
                      <circle cx={x} cy={y} r="2" fill={color} />
                      {/* Progress line to axis */}
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={20 + verticalOffset + 360}
                        stroke={color}
                        strokeWidth="1"
                        strokeDasharray="1,2"
                        opacity="0.5"
                      />
                      <line
                        x1="20"
                        y1={y}
                        x2={x}
                        y2={y}
                        stroke={color}
                        strokeWidth="1"
                        strokeDasharray="1,2"
                        opacity="0.5"
                      />
                    </g>
                  );
                })()}

              {/* Curve label */}
              <text
                x={index * 80 + 60}
                y="15"
                textAnchor="middle"
                className="text-[6px] fill-gray-300 font-mono"
              >
                {element.name}
              </text>
              <text
                x={index * 80 + 60}
                y="140"
                textAnchor="middle"
                className="text-[5px] fill-gray-500 font-mono"
              >
                {element.easing}
              </text>
            </g>
          );
        })}

        {/* Reference lines */}
        <line
          x1="20"
          y1="380"
          x2="380"
          y2="20"
          stroke="#9ca3af"
          strokeWidth="1"
          strokeDasharray="1,3"
          opacity="0.5"
        />
        <text
          x="370"
          y="25"
          textAnchor="end"
          className="text-[6px] fill-gray-500 font-mono"
        >
          linear
        </text>
      </svg>
    </div>
      </>
    )}
  </div>
  );
};
