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
    <div className="legacy-controls">
      <div className={`legacy-settings ${isVisible ? 'is-visible' : ''}`}>
        <p className="legacy-settings__label">Tipografía</p>
        <div className="legacy-settings__row">
          <button
            type="button"
            onClick={() => onFontChange(CardFont.MONTSERRAT)}
            className={
              currentFont === CardFont.MONTSERRAT
                ? 'legacy-option is-active'
                : 'legacy-option'
            }
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Montserrat
          </button>
          <button
            type="button"
            onClick={() => onFontChange(CardFont.CALIBRI)}
            className={
              currentFont === CardFont.CALIBRI
                ? 'legacy-option is-active'
                : 'legacy-option'
            }
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Calibri
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        disabled={!isModelLoaded}
        className={
          isVisible
            ? 'legacy-toggle is-on'
            : 'legacy-toggle'
        }
      >
        {isVisible ? 'Ocultar ficha' : 'Ver ficha del plato'}
      </button>
    </div>
  );
};

export default InfoCardControls;
