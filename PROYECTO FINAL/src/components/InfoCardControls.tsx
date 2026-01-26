import React from 'react';
import { CardFont } from '../types';

interface InfoCardControlsProps {
  isVisible: boolean;
  onToggle: () => void;
  currentFont: CardFont;
  onFontChange: (font: CardFont) => void;
  isModelLoaded: boolean;
}

const InfoCardControls: React.FC<InfoCardControlsProps> = ({
  isVisible,
  onToggle,
  currentFont,
  onFontChange,
  isModelLoaded
}) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center pointer-events-none z-10 px-4">
      
      {/* Settings Container - floating slightly above buttons */}
      <div className={`
        bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl mb-4 
        transition-all duration-300 pointer-events-auto border border-white/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <div className="flex flex-col gap-3 min-w-[280px]">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Typography</label>
          <div className="flex gap-2">
            <button
              onClick={() => onFontChange(CardFont.MONTSERRAT)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                currentFont === CardFont.MONTSERRAT
                  ? 'bg-orange-500 text-white border-orange-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Montserrat
            </button>
            <button
              onClick={() => onFontChange(CardFont.CALIBRI)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                currentFont === CardFont.CALIBRI
                  ? 'bg-orange-500 text-white border-orange-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'Calibri, sans-serif' }}
            >
              Calibri
            </button>
          </div>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={onToggle}
        disabled={!isModelLoaded}
        className={`
          pointer-events-auto
          px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300
          flex items-center gap-3
          ${!isModelLoaded ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 
            isVisible 
              ? 'bg-gray-800 text-white hover:bg-gray-900' 
              : 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105'
          }
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {isVisible ? 'Hide Dish Info' : 'View Dish Info'}
      </button>
    </div>
  );
};

export default InfoCardControls;