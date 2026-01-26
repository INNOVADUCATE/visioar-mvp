import React, { useEffect, useRef, useState } from 'react';
import { Dish, TextureConfig } from '../types';
import { generateInfoCardTexture } from '../services/textureGenerator';
import { INFO_CARD_MATERIAL_NAME } from '../constants';

interface ARSceneProps {
  dish: Dish;
  config: TextureConfig;
  showCard: boolean;
}

const ARScene: React.FC<ARSceneProps> = ({ dish, config, showCard }) => {
  const modelRef = useRef<HTMLElement>(null);
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  // 1. Generate the texture whenever data or config changes
  useEffect(() => {
    const url = generateInfoCardTexture(dish, config);
    setTextureUrl(url);
  }, [dish, config]);

  // 2. Apply texture to the model
  useEffect(() => {
    if (!modelRef.current || !textureUrl) return;

    const applyTexture = async () => {
      const modelViewer = modelRef.current as any;
      
      // Wait for model to load
      if (!modelViewer.model) return;

      // Note: This requires a GLB that actually has a material named accordingly.
      // If the material isn't found, we log it (common in dev if using placeholder models).
      const material = modelViewer.model.materials.find((m: any) => m.name === INFO_CARD_MATERIAL_NAME);

      if (material) {
        if (showCard) {
            // Create a texture from the Data URL
            const texture = await modelViewer.createTexture(textureUrl);
            
            // Restore base color factor before applying visibility settings
            material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
            
            // Apply to base color
            material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
            
            // Ensure alpha mode is opaque or mask based on need (set after base color)
            material.setAlphaMode('OPAQUE'); 
            
            // Emissive makes it visible in low light AR
            material.emissiveFactor = [0.2, 0.2, 0.2];
            material.emissiveTexture.setTexture(texture);
        } else {
            // Clear emissive state to avoid lingering glow when hidden
            material.emissiveFactor = [0, 0, 0];
            material.emissiveTexture.setTexture(null);
            
            // To hide it, we could set alpha to 0 or move it. 
            // Setting base color to transparent:
            material.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]);
            material.setAlphaMode('BLEND');
        }
      } else {
        console.warn(`Material "${INFO_CARD_MATERIAL_NAME}" not found in model. Texture generated but not applied to 3D mesh.`);
      }
    };

    // Try applying immediately and attach listener for load
    applyTexture();
    modelRef.current.addEventListener('load', applyTexture);

    return () => {
       modelRef.current?.removeEventListener('load', applyTexture);
    };
  }, [textureUrl, showCard]);

  // Cast custom element to any to avoid IntrinsicElements TypeScript errors without polluting global scope
  const ModelViewer = 'model-viewer' as any;

  return (
    <div className="w-full h-full relative bg-gray-900">
      <ModelViewer
        ref={modelRef}
        src={dish.modelUrl}
        ios-src="" // Add USDZ path here for iOS native quicklook if available
        alt={`3D model of ${dish.name}`}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        shadow-intensity="1"
        auto-rotate
        ar-placement="floor" 
        ar-scale="fixed"
        style={{ width: '100%', height: '100%' }}
      >
        <div slot="ar-button" className="absolute bottom-8 right-8 bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 cursor-pointer z-50">
           <span className="text-xl">🧊</span> View in AR
        </div>
      </ModelViewer>
      
      {/* Debug: Invisible image to ensure texture generation is working logic-wise if 3D application fails */}
      {textureUrl && <img src={textureUrl} className="hidden" alt="Texture Debug" />}
    </div>
  );
};

export default ARScene;
