import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dish, CardFont } from '../types';
import { generateInfoCardTexture } from '../services/textureGenerator';

interface DishARViewerProps {
  dish: Dish;
  font: CardFont;
  showInfoCard: boolean;
  onLoadStatusChange: (loaded: boolean) => void;
}

const DishARViewer: React.FC<DishARViewerProps> = ({
  dish,
  font,
  showInfoCard,
  onLoadStatusChange
}) => {
  const modelViewerRef = useRef<HTMLElement>(null);
  const [generatedTextureUrl, setGeneratedTextureUrl] = useState<string | null>(null);
  const ModelViewer = 'model-viewer' as any;

  useEffect(() => {
    let isMounted = true;

    const createTexture = async () => {
      try {
        const url = await generateInfoCardTexture(dish, font);
        if (isMounted) {
          setGeneratedTextureUrl(url);
        }
      } catch (error) {
        console.error('Failed to generate texture', error);
      }
    };

    createTexture();

    return () => {
      isMounted = false;
    };
  }, [dish, font]);

  const applyTextureToModel = useCallback(async () => {
    const mv = modelViewerRef.current as any;
    if (!mv || !mv.model || !generatedTextureUrl) return;

    try {
      await mv.createTexture(generatedTextureUrl);
      console.log(`[Legacy AR] Applied dynamic texture with font ${font}.`);
    } catch (error) {
      console.error('Error applying texture to model-viewer material', error);
    }
  }, [generatedTextureUrl, font]);

  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;

    const handleLoad = () => {
      onLoadStatusChange(true);
      applyTextureToModel();
    };

    mv.addEventListener('load', handleLoad);
    if ((mv as any).loaded) {
      handleLoad();
    }

    return () => {
      mv.removeEventListener('load', handleLoad);
    };
  }, [applyTextureToModel, onLoadStatusChange]);

  useEffect(() => {
    if (generatedTextureUrl) {
      applyTextureToModel();
    }
  }, [showInfoCard, applyTextureToModel, generatedTextureUrl]);

  return (
    <div className="legacy-viewer">
      <ModelViewer
        ref={modelViewerRef}
        src={dish.modelSrc}
        ios-src={dish.iosSrc}
        poster={dish.poster}
        alt={`3D model of ${dish.name}`}
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
        ar-modes="scene-viewer webxr quick-look"
        environment-image="neutral"
        className="legacy-model"
      >
        {showInfoCard && generatedTextureUrl && (
          <button
            slot="hotspot-info"
            data-surface="0 0 100 0.5 0.5 0.5"
            className="legacy-info-card"
          >
            <img src={generatedTextureUrl} alt="Legacy info card" />
          </button>
        )}

        <div slot="poster" className="legacy-loading">
          Cargando modelo 3D...
        </div>
      </ModelViewer>
    </div>
  );
};

export default DishARViewer;
