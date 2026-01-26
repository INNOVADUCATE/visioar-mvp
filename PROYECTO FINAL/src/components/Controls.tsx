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
    <div className="controls-panel">
      <div className="controls-panel__card">
        <h1 className="controls-panel__title">Gourmet AR</h1>

        <div className="controls-panel__row">
          <span className="controls-panel__row-label">Info Card</span>
          <button
            onClick={onToggleCard}
            className={`controls-panel__button ${
              showCard
                ? 'controls-panel__button--active'
                : 'controls-panel__button--inactive'
            }`}
            type="button"
          >
            {showCard ? 'VISIBLE' : 'HIDDEN'}
          </button>
        </div>

        <div className="controls-panel__section">
          <label className="controls-panel__label">Typography</label>
          <div className="controls-panel__grid">
            <button
              onClick={() => onConfigChange({ ...config, fontFamily: FontFamily.MONTSERRAT })}
              className={`controls-panel__option ${
                config.fontFamily === FontFamily.MONTSERRAT
                  ? 'controls-panel__option--active'
                  : ''
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
              type="button"
            >
              Montserrat
            </button>
            <button
              onClick={() => onConfigChange({ ...config, fontFamily: FontFamily.CALIBRI })}
              className={`controls-panel__option ${
                config.fontFamily === FontFamily.CALIBRI ? 'controls-panel__option--active' : ''
              }`}
              style={{ fontFamily: 'Calibri, sans-serif' }}
              type="button"
            >
              Calibri
            </button>
          </div>
        </div>
      </div>

      <div className="controls-panel__card">
        <p className="controls-panel__label" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          Generated Texture Map
        </p>
        <div className="controls-panel__preview">
          {generatedTexturePreview ? (
            <img src={generatedTexturePreview} alt="Preview" />
          ) : (
            <div className="controls-panel__preview-text">Generating...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
