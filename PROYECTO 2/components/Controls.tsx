import React from 'react';
import { FontFamily, TextureConfig } from '../types';

interface ControlsProps {
  showCard: boolean;
  onToggleCard: () => void;
  config: TextureConfig;
  onConfigChange: (newConfig: TextureConfig) => void;
  generatedTexturePreview: string | null;
}

const Controls: React.FC<ControlsProps> = ({
  showCard,
  onToggleCard,
  config,
  onConfigChange,
  generatedTexturePreview
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 max-w-[300px]">
      {/* Main Panel */}
      <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white shadow-2xl">
        <h1 className="text-xl font-bold mb-4 text-amber-400">Gourmet AR</h1>
        
        <div className="space-y-4">
          {/* Visibility Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Info Card</span>
            <button
              onClick={onToggleCard}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                showCard 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {showCard ? 'VISIBLE' : 'HIDDEN'}
            </button>
          </div>

          {/* Typography Selector */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
              Typography
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onConfigChange({ ...config, fontFamily: FontFamily.MONTSERRAT })}
                className={`p-2 rounded border text-xs ${
                  config.fontFamily === FontFamily.MONTSERRAT
                    ? 'border-amber-500 text-amber-500'
                    : 'border-white/10 text-gray-400'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Montserrat
              </button>
              <button
                onClick={() => onConfigChange({ ...config, fontFamily: FontFamily.CALIBRI })}
                className={`p-2 rounded border text-xs ${
                  config.fontFamily === FontFamily.CALIBRI
                    ? 'border-amber-500 text-amber-500'
                    : 'border-white/10 text-gray-400'
                }`}
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                Calibri
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Texture Preview (Debug for Developer/User) */}
      <div className="bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
        <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest text-center">
          Generated Texture Map
        </p>
        <div className="w-full aspect-[1/2] bg-gray-800 rounded overflow-hidden relative">
            {generatedTexturePreview ? (
                <img 
                    src={generatedTexturePreview} 
                    alt="Preview" 
                    className="w-full h-full object-contain"
                />
            ) : (
                <div className="flex items-center justify-center h-full text-xs text-gray-500">Generating...</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Controls;