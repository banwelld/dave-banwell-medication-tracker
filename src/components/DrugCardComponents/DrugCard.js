import React from 'react';
import DrugCardInfo from './DrugCardInfo';
import DrugCardActions from './DrugCardActions';

function DrugCard({ setAllDrugData, drugObject }) {
  // destructure the drug object

  const {
    id: drugId,
    brandName,
    dailyDoses,
    currentSupply,
    imageLink,
  } = drugObject;

  // calculate remaining day's supply (whole days only)

  const daysRemaining = parseInt(currentSupply / dailyDoses);

  // dynamic className to change the background colourr to warn of low supplies

  const dynamicBg =
    daysRemaining === 0
      ? 'bg-danger'
      : daysRemaining <= 5
      ? 'bg-warning'
      : 'bg-light';

  return (
    <article className='col-3 my-3'>
      <div className={`card shadow m-auto width-14 ${dynamicBg}`}>
        <div className='row align-items-center height-14 p-2'>
          <img src={imageLink} className='card-img-top' alt={brandName} />
        </div>
        <DrugCardInfo drugObject={drugObject} daysRemaining={daysRemaining} />
        <DrugCardActions
          drugId={drugId}
          currentSupply={currentSupply}
          setAllDrugData={setAllDrugData}
        />
      </div>
    </article>
  );
}

export default DrugCard;
