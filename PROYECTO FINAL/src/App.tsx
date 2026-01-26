import React, { useMemo, useState } from 'react';
import ARScene from './components/ARScene';
import Controls from './components/Controls';
import ARCard from './components/ARCard';
import DishARViewer from './components/DishARViewer';
import InfoCardControls from './components/InfoCardControls';
import { BURGER_DISH, DEFAULT_TEXTURE_CONFIG, DISHES, INITIAL_FONT } from './constants';
import { CardFont, TextureConfig } from './types';
import { generateInfoCardTexture } from './services/textureGenerator';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [textureConfig, setTextureConfig] = useState<TextureConfig>(DEFAULT_TEXTURE_CONFIG);
  const [currentFont, setCurrentFont] = useState<CardFont>(INITIAL_FONT);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const legacyDish = DISHES[0];

  // Generate a preview URL for the UI so the user can see what the AR card will look like
  const textureUrl = useMemo(() => {
    return generateInfoCardTexture(BURGER_DISH, textureConfig);
  }, [textureConfig]);

  return (
    <div className="ar-app">
      {/* The 3D/AR View Layer */}
      <ARScene 
        dish={BURGER_DISH}
        showCard={showCard}
        textureUrl={textureUrl}
      />

      {/* The UI Overlay Layer */}
      <Controls
        showCard={showCard}
        onToggleCard={() => setShowCard(!showCard)}
        config={textureConfig}
        onConfigChange={setTextureConfig}
        generatedTexturePreview={textureUrl}
      />

      {showCard && (
        <div className="ar-card-shell">
          <ARCard dish={BURGER_DISH} />
        </div>
      )}

      <section className="legacy-module">
        <header className="legacy-module__header">
          <div>
            <p className="legacy-module__eyebrow">Legacy Module</p>
            <h2 className="legacy-module__title">AR Dish Viewer</h2>
          </div>
          <button className="legacy-module__toggle" onClick={() => setShowCard(!showCard)}>
            {showCard ? 'Ocultar tarjeta' : 'Mostrar tarjeta'}
          </button>
        </header>

        <div className="legacy-module__viewer">
          <DishARViewer
            dish={legacyDish}
            font={currentFont}
            showInfoCard={showCard}
            onLoadStatusChange={setIsModelLoaded}
          />
        </div>
      </section>

      <InfoCardControls
        isVisible={showCard}
        onToggle={() => setShowCard(!showCard)}
        currentFont={currentFont}
        onFontChange={setCurrentFont}
        isModelLoaded={isModelLoaded}
      />

      {/* Help Text */}
      <div className="help-text">
        <p>Gourmet AR Experience v1.0</p>
        <p>Tap 'View in AR' to place the dish.</p>
      </div>
    </div>
  );
}

export default App;
