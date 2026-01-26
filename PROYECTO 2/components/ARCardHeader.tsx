import React from 'react';
import { Dish } from '../types';

interface ARCardHeaderProps {
  dish: Dish;
  badgeLabel?: string;
}

const ARCardHeader: React.FC<ARCardHeaderProps> = ({
  dish,
  badgeLabel = 'Signature Selection'
}) => {
  return (
    <div className="ar-card__header">
      <h1 className="ar-card__title">
        {dish.name.split(' ').slice(0, -1).join(' ')}{' '}
        <span className="ar-card__title-highlight">{dish.name.split(' ').slice(-1)}</span>
      </h1>
      <div className="ar-card__badge-row">
        <span className="ar-card__badge-line" />
        <p className="ar-card__badge-text">{badgeLabel}</p>
        <span className="ar-card__badge-line" />
      </div>
      {dish.description && <p className="ar-card__description">{dish.description}</p>}
    </div>
  );
};

export default ARCardHeader;
