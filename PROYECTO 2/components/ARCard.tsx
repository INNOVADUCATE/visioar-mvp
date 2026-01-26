import React from 'react';
import { Dish } from '../types';
import ARCardHeader from './ARCardHeader';
import ARCardIngredients from './ARCardIngredients';
import ARCardFooter from './ARCardFooter';

interface ARCardProps {
  dish: Dish;
}

const ARCard: React.FC<ARCardProps> = ({ dish }) => {
  return (
    <div className="ar-card">
      <div className="ar-card__noise" />
      <div className="ar-card__hero">
        <div className="ar-card__hero-gradient" />
        {dish.imageUrl && (
          <img
            className="ar-card__image"
            src={dish.imageUrl}
            alt={dish.name}
          />
        )}
        <div className="ar-card__weight">
          <div className="ar-card__weight-pill">
            <span className="material-symbols-outlined">scale</span>
            <span>{dish.weight}</span>
          </div>
        </div>
      </div>
      <div className="ar-card__content">
        <ARCardHeader dish={dish} />
        <div className="ar-card__spacer" />
        <ARCardIngredients ingredients={dish.ingredients} />
        <div className="ar-card__spacer" />
        <ARCardFooter price={dish.price} ctaLabel={dish.ctaLabel} />
        <div className="ar-card__indicator">
          <span className="material-symbols-outlined">view_in_ar</span>
          <span>AR Preview</span>
        </div>
      </div>
    </div>
  );
};

export default ARCard;
