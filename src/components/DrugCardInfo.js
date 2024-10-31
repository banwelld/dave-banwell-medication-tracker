import React from 'react';

function DrugCardInfo({ drugObj, daysRemaining }) {
  // destructure drugObj

  const { brandName, genericName, dailyQty, drugFormat, isOptional } = drugObj;

  // render DrugCardInfo component

  return (
    <div className='card-body rounded-3'>
      <h5 className='card-title fw-semibold'>{brandName}</h5>
      <h6 className='small'>{genericName}</h6>
      <hr />
      <p className='list-group-item small'>
        {dailyQty} {drugFormat}
        {dailyQty !== 1 && 's'} daily
        {isOptional && ', as needed'}
      </p>
      <p className='list-group-item fw-semibold small'>
        Supply: {daysRemaining} day{daysRemaining !== 1 && 's'}
      </p>
    </div>
  );
}

export default DrugCardInfo;
