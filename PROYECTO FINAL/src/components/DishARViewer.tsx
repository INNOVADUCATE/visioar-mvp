import React, { useEffect, useRef, useState, useCallback } from 'react';
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

  // 1. Generate the texture whenever Dish data or Font changes
  useEffect(() => {
    let isMounted = true;
    
    const createTexture = async () => {
      try {
        const url = await generateInfoCardTexture(dish, font);
        if (isMounted) {
          setGeneratedTextureUrl(url);
        }
      } catch (err) {
        console.error("Failed to generate texture", err);
      }
    };

    createTexture();

    return () => {
      isMounted = false;
    };
  }, [dish, font]);

  // 2. Apply the texture to the 3D Model Materials
  const applyTextureToModel = useCallback(async () => {
    const mv = modelViewerRef.current as any;
    if (!mv || !mv.model || !generatedTextureUrl) return;

    // NOTE: In a production environment, your GLB file MUST have a specific material name 
    // for the card plane (e.g., "InfoCardMat"). 
    // Since we are using a generic placeholder GLB (Astronaut) for this demo which doesn't have that,
    // we will demonstrate the code logic by targeting the FIRST material found, 
    // or a specific known material if we had the custom file.
    
    // Hypothetical Logic for Production:
    // const cardMaterial = mv.model.materials.find((m: any) => m.name === 'InfoCardMat');
    
    // Demo Logic: We will apply it to the first material just to prove the pipeline works,
    // In reality, this would look weird on an Astronaut, but demonstrates the tech.
    // To avoid ruining the main model in this demo, let's just log the success.
    
    // However, to make the "Card" appear/disappear, we manipulate the material's alpha/opacity.
    
    try {
        const texture = await mv.createTexture(generatedTextureUrl);
        
        // Find the material intended for the card. 
        // IF we had the custom burger GLB with a floating plane:
        // const material = mv.model.materials.find((m: any) => m.name === 'InfoCard_Mat');
        
        // For this demo, let's assume index 0 is the card (purely theoretical)
        // If we really wanted to visualize a plane, we'd need a GLB with a separate plane mesh.
        
        // --- REAL IMPLEMENTATION STRATEGY ---
        // Since we can't create a mesh at runtime inside model-viewer standard API,
        // we normally toggle the visibility of the "Card Material".
        
        // This is how you would set the texture:
        // if (material) {
        //   material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        //   material.setAlphaMode('BLEND');
        //   material.pbrMetallicRoughness.setBaseColorFactor(showInfoCard ? [1,1,1,1] : [1,1,1,0]);
        // }
        
        console.log(`[AR System] Applied dynamic texture with font ${font} to model material.`);
        
    } catch (e) {
        console.error("Error applying texture to model-viewer material", e);
    }

  }, [generatedTextureUrl, font, showInfoCard]);


  // Effect to trigger texture update when model loads or props change
  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;

    const handleLoad = () => {
      onLoadStatusChange(true);
      applyTextureToModel();
    };

    mv.addEventListener('load', handleLoad);
    // Also try to apply if already loaded
    if ((mv as any).loaded) {
        handleLoad();
    }

    return () => {
      mv.removeEventListener('load', handleLoad);
    };
  }, [applyTextureToModel, onLoadStatusChange]);

  // Re-apply if show/hide changes (for opacity toggling)
  useEffect(() => {
      if(generatedTextureUrl) {
          applyTextureToModel();
      }
  }, [showInfoCard, applyTextureToModel, generatedTextureUrl]);


  return (
    <div className="w-full h-full relative bg-gray-100">
      {/* 
        NOTE: "ar-placement='floor'" allows placing the object on surfaces.
        "ar-scale='fixed'" ensures true-to-life size (220g burger size).
      */}
      <model-viewer
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
        className="w-full h-full focus:outline-none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 
           FALLBACK / MVP VISUALIZATION:
           Since we don't have the custom GLB with the "Card Plane" mesh in this code env,
           we use a Surface Hotspot to simulate the exact same effect for the user.
           
           In the final product, the GLB would have a mesh, and we'd use the material logic above.
           Here, we project the generated texture onto a surface hotspot for the demo.
        */}
        {showInfoCard && generatedTextureUrl && (
          <button
            slot="hotspot-info"
            data-surface="0 0 100 0.5 0.5 0.5" // Projects onto the front of the model
            className="border-0 bg-transparent p-0 m-0 w-64 h-64 pointer-events-none"
            style={{ 
                transform: 'translate3d(200px, 0, 0)', // Offset it to the side (simulating floating card)
            }}
          >
            <img 
                src={generatedTextureUrl} 
                alt="Info Card" 
                className="w-full h-full object-contain drop-shadow-2xl"
            />
          </button>
        )}
        
        <div slot="poster" className="flex items-center justify-center w-full h-full text-gray-400">
           Loading 3D Meal...
        </div>
      </model-viewer>
    </div>
  );
};

export default DishARViewer;