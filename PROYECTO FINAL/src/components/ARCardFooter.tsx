import React from 'react';

interface ARCardFooterProps {
  price?: string;
}

const ARCardFooter: React.FC<ARCardFooterProps> = ({ price }) => {
  return (
    <div className="ar-card__footer">
      <div className="ar-card__price">
        <span className="ar-card__price-label">Total Price</span>
        <span className="ar-card__price-value">{price ?? 'Precio a consultar'}</span>
      </div>
      <button className="ar-card__action" type="button">
        <span>ADD TO ORDER</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
};

export default ARCardFooter;
