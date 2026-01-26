import React, { useMemo, useState } from 'react';
import ARScene from './components/ARScene';
import Controls from './components/Controls';
import ARCard from './components/ARCard';
import { DEFAULT_TEXTURE_CONFIG, DISHES } from './constants';
import { Dish, TextureConfig } from './types';
import { generateInfoCardTexture } from './services/textureGenerator';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [textureConfig, setTextureConfig] = useState<TextureConfig>(DEFAULT_TEXTURE_CONFIG);
  const [activeDishId, setActiveDishId] = useState<string>(DISHES[0]?.id ?? '');

  const activeDish = useMemo<Dish>(() => {
    return DISHES.find((dish) => dish.id === activeDishId) ?? DISHES[0];
  }, [activeDishId]);

  // Generate a preview URL for the UI so the user can see what the AR card will look like
  const textureUrl = useMemo(() => {
    return generateInfoCardTexture(activeDish, textureConfig);
  }, [activeDish, textureConfig]);

  return (
    <div className="ar-app">
      {/* The 3D/AR View Layer */}
      <ARScene 
        dish={activeDish}
        showCard={showCard}
        textureUrl={textureUrl}
      />

      {/* The UI Overlay Layer */}
      <Controls
        dishes={DISHES}
        activeDishId={activeDish.id}
        onDishChange={setActiveDishId}
        showCard={showCard}
        onToggleCard={() => setShowCard(!showCard)}
        config={textureConfig}
        onConfigChange={setTextureConfig}
        generatedTexturePreview={textureUrl}
      />

      {showCard && (
        <div className="ar-card-shell">
          <ARCard dish={activeDish} />
        </div>
      )}

      {/* Help Text */}
      <div className="help-text">
        <p>Gourmet AR Experience v1.0</p>
        <p>Tap '{activeDish.arLabel ?? 'View in AR'}' to place the dish.</p>
      </div>
    </div>
  );
}

export default App;
