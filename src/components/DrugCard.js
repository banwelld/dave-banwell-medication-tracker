import React from 'react';
import DrugCardInfo from './DrugCardInfo';
import DrugCardActions from './DrugCardActions';

function DrugCard({ displayUpdatedDrug, drugObj }) {
  // destructure the drug object

  const {
    id,
    imgUrl,
    brandName,
    genericName,
    drugFormat,
    dailyQty,
    qtyInStock,
    isOptional,
  } = drugObj;

  // calculate day's supply

  const daysRemaining = parseInt(qtyInStock / dailyQty);

  // generate different classnames for the cards based on days to stock depletion

  const cardBgClassName =
    daysRemaining === 0
      ? 'bg-danger'
      : daysRemaining <= 5
      ? 'bg-warning'
      : 'bg-light';

  return (
    <article className='col-3 mt-3 mb-3'>
      <div className={`card shadow mx-auto width-14 ${cardBgClassName}`}>
        <div className='row align-items-center p-1 height-14'>
          <img src={imgUrl} className='card-img-top' alt={brandName} />
        </div>
        <DrugCardInfo
          brandName={brandName}
          genericName={genericName}
          drugFormat={drugFormat}
          dailyQty={dailyQty}
          daysRemaining={daysRemaining}
          isOptional={isOptional}
        />
        <DrugCardActions
          drugId={id}
          qtyInStock={qtyInStock}
          displayUpdatedDrug={displayUpdatedDrug}
        />
      </div>
    </article>
  );
}

export default DrugCard;
