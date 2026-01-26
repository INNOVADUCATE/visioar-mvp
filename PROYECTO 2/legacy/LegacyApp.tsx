import React, { useMemo, useState } from 'react';
import DishARViewer from './components/DishARViewer';
import InfoCardControls from './components/InfoCardControls';
import { LEGACY_APP_NAME, LEGACY_DISHES, LEGACY_INITIAL_FONT } from './constants';
import { CardFont, Dish } from './types';

const LegacyApp: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentFont, setCurrentFont] = useState<CardFont>(LEGACY_INITIAL_FONT);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [currentDishId, setCurrentDishId] = useState<string>(LEGACY_DISHES[0]?.id ?? '');

  const currentDish = useMemo<Dish>(() => {
    return LEGACY_DISHES.find((dish) => dish.id === currentDishId) ?? LEGACY_DISHES[0];
  }, [currentDishId]);

  return (
    <div className="legacy-app">
      <header className="legacy-header">
        <div>
          <p className="legacy-kicker">MVP histórico</p>
          <h1>{LEGACY_APP_NAME}</h1>
          <p className="legacy-subtitle">Demo original del menú en AR.</p>
        </div>
        <label className="legacy-select">
          Plato
          <select
            value={currentDish.id}
            onChange={(event) => setCurrentDishId(event.target.value)}
          >
            {LEGACY_DISHES.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="legacy-main">
        <DishARViewer
          dish={currentDish}
          font={currentFont}
          showInfoCard={showCard}
          onLoadStatusChange={setIsModelLoaded}
        />
      </main>

      <InfoCardControls
        isVisible={showCard}
        onToggle={() => setShowCard((prev) => !prev)}
        currentFont={currentFont}
        onFontChange={setCurrentFont}
        isModelLoaded={isModelLoaded}
      />

      {isModelLoaded && !showCard && (
        <div className="legacy-hint">Interactúa para rotar • Activa la ficha abajo</div>
      )}
    </div>
  );
};

export default LegacyApp;
