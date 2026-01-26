import React, { useState } from 'react';
import DishARViewer from './components/DishARViewer';
import InfoCardControls from './components/InfoCardControls';
import { DISHES, INITIAL_FONT } from './constants';
import { CardFont } from './types';

const App: React.FC = () => {
  // State
  const [currentDish] = useState(DISHES[0]); // Just showing the first dish for MVP
  const [showCard, setShowCard] = useState(false);
  const [currentFont, setCurrentFont] = useState<CardFont>(INITIAL_FONT);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Handlers
  const toggleCard = () => setShowCard((prev) => !prev);
  const handleFontChange = (font: CardFont) => setCurrentFont(font);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-gray-50">
      
      {/* Header / Brand */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/40">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">GOURMET<span className="text-orange-600">AR</span></h1>
            <p className="text-xs text-gray-500 font-medium">Augmented Menu Experience</p>
          </div>
        </div>
      </header>

      {/* Main AR View */}
      <main className="flex-grow relative z-0">
        <DishARViewer 
          dish={currentDish}
          font={currentFont}
          showInfoCard={showCard}
          onLoadStatusChange={setIsModelLoaded}
        />
      </main>

      {/* Interactive Controls */}
      <InfoCardControls 
        isVisible={showCard}
        onToggle={toggleCard}
        currentFont={currentFont}
        onFontChange={handleFontChange}
        isModelLoaded={isModelLoaded}
      />
      
      {/* AR Hint Overlay (Only visible when model is loaded and user hasn't interacted much) */}
      {isModelLoaded && !showCard && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 z-10">
           <div className="animate-pulse bg-black/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              Interact to rotate • Toggle info below
           </div>
        </div>
      )}
    </div>
  );
};

export default App;