import React, { useMemo, useState } from 'react';
import ARScene from './components/ARScene';
import Controls from './components/Controls';
import ARCard from './components/ARCard';
import { BURGER_DISH, DEFAULT_TEXTURE_CONFIG } from './constants';
import { TextureConfig } from './types';
import { generateInfoCardTexture } from './services/textureGenerator';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [textureConfig, setTextureConfig] = useState<TextureConfig>(DEFAULT_TEXTURE_CONFIG);

  // Generate a preview URL for the UI so the user can see what the AR card will look like
  const previewUrl = useMemo(() => {
    return generateInfoCardTexture(BURGER_DISH, textureConfig);
  }, [textureConfig]);

  return (
    <div className="ar-app">
      {/* The 3D/AR View Layer */}
      <ARScene dish={BURGER_DISH} config={textureConfig} showCard={showCard} />

      {/* The UI Overlay Layer */}
      <Controls
        showCard={showCard}
        onToggleCard={() => setShowCard(!showCard)}
        config={textureConfig}
        onConfigChange={setTextureConfig}
        generatedTexturePreview={previewUrl}
      />

      {showCard && (
        <div className="ar-card-shell">
          <ARCard dish={BURGER_DISH} />
        </div>
      )}

      {/* Help Text */}
      <div className="help-text">
        <p>Gourmet AR Experience v1.0</p>
        <p>Tap 'View in AR' to place the dish.</p>
      </div>
    </div>
  );
}

export default App;
