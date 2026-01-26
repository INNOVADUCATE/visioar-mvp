import React from 'react';

interface ARCardIngredientsProps {
  ingredients: string[];
}

const iconCycle = ['bakery_dining', 'lunch_dining', 'water_drop', 'token', 'spa'];

const ARCardIngredients: React.FC<ARCardIngredientsProps> = ({ ingredients }) => {
  return (
    <div className="ar-card__ingredients">
      {ingredients.map((ingredient, index) => (
        <div className="ar-card__ingredient-row" key={`${ingredient}-${index}`}>
          <div className="ar-card__ingredient-info">
            <span className="ar-card__ingredient-icon">
              <span className="material-symbols-outlined">
                {iconCycle[index % iconCycle.length]}
              </span>
            </span>
            <div>
              <p className="ar-card__ingredient-name">{ingredient}</p>
              <p className="ar-card__ingredient-note">Selección del chef</p>
            </div>
          </div>
          <span className="material-symbols-outlined ar-card__ingredient-check">check</span>
        </div>
      ))}
    </div>
  );
};

export default ARCardIngredients;
