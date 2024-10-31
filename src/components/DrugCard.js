import React from 'react';
import DrugCardInfo from './DrugCardInfo';
import DrugCardActions from './DrugCardActions';

function DrugCard({ setAllDrugData, drugObj }) {
  // destructure the drug object

  const { drugId, brandName, dailyQty, qtyInStock, imgUrl } = drugObj;

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
    <article className='col-3 my-3'>
      <div className={`card shadow mx-auto width-14 ${cardBgClassName}`}>
        <div className='row align-items-center p-2 height-14'>
          <img src={imgUrl} className='card-img-top' alt={brandName} />
        </div>
        <DrugCardInfo drugObj={drugObj} daysRemaining={daysRemaining} />
        <DrugCardActions
          drugId={drugId}
          qtyInStock={qtyInStock}
          setAllDrugData={setAllDrugData}
        />
      </div>
    </article>
  );
}

export default DrugCard;
