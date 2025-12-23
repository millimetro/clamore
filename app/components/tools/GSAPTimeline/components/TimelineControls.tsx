"use client";

import { TimelineControlsProps } from "../types";

export const TimelineControls = ({
  isPlaying,
  isScrubbing,
  progress,
  onPlay,
  onPause,
  onRestart,
  onSeek,
  onScrubStart,
  onScrubEnd,
  onScrub,
}: TimelineControlsProps) => (
  <>
    <style jsx>{`
      .slider::-webkit-slider-thumb {
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #6b7280;
        cursor: grab;
        border: 2px solid #1f2937;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      }

      .slider::-webkit-slider-thumb:hover {
        background: #9ca3af;
        transform: scale(1.1);
        border-color: #374151;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      .slider::-webkit-slider-thumb:active {
        cursor: grabbing;
        background: #d1d5db;
        transform: scale(1.2);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
      }

      .slider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #6b7280;
        cursor: grab;
        border: 2px solid #1f2937;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      }

      .slider::-moz-range-thumb:hover {
        background: #9ca3af;
        transform: scale(1.1);
        border-color: #374151;
      }

      .slider::-moz-range-thumb:active {
        cursor: grabbing;
        background: #d1d5db;
        transform: scale(1.2);
      }

      .slider:active::-webkit-slider-thumb {
        background: #22d3ee;
        border-color: #22d3ee;
        box-shadow: 0 0 12px rgba(34, 211, 238, 0.4);
      }

      .slider::-webkit-slider-track {
        background: #374151;
        height: 4px;
        border-radius: 2px;
      }

      .slider::-moz-range-track {
        background: #374151;
        height: 4px;
        border-radius: 2px;
        border: none;
      }
    `}</style>
  <div className="flex items-center space-x-2 mb-3">
    <button
      onClick={onPlay}
      disabled={isPlaying}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
    >
      <div className="w-0 h-0 border-l-[6px] border-l-gray-300 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
    </button>
    <button
      onClick={onPause}
      disabled={!isPlaying}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
    >
      <div className="flex space-x-1">
        <div className="w-1 h-3 bg-gray-300"></div>
        <div className="w-1 h-3 bg-gray-300"></div>
      </div>
    </button>
    <button
      onClick={onRestart}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <svg
        className="w-3 h-3 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    <div className="flex-1 mx-2 relative">
      <div className="relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={isScrubbing ? onScrub : onSeek}
          onMouseDown={onScrubStart}
          onMouseUp={onScrubEnd}
          onTouchStart={onScrubStart}
          onTouchEnd={onScrubEnd}
          className={`w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider ${
            isScrubbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ cursor: isScrubbing ? "grabbing" : "grab" }}
        />

        {isScrubbing && (
          <div
            className="absolute top-0 left-0 h-1 bg-white opacity-50 rounded-full pointer-events-none"
            style={{ width: `${progress * 100}%` }}
          ></div>
        )}
      </div>
    </div>

    <div className="text-xs text-gray-400 font-mono">
      {Math.round(progress * 100)}%
    </div>
  </div>
  </>
);
