import React from 'react';

function DrugCardInfo({
  brandName,
  genericName,
  drugFormat,
  dailyQty,
  daysRemaining,
  isOptional,
}) {
  return (
    <div className='card-body'>
      <h5 className='card-title fw-semibold mb-1'>{brandName}</h5>
      <h6 className='mb-1 mt-1 lh-1'>
        <small>{genericName}</small>
      </h6>
      <hr />
      <p className='list-group-item mt-3 mb-1 lh-1 small'>
        {dailyQty} {drugFormat}
        {dailyQty !== 1 && 's'} daily
        {isOptional && ', as needed'}
      </p>
      <p className='list-group-item mt-2 mb-1 lh-1 small'>
        Supply: {daysRemaining} day{daysRemaining !== 1 && 's'}
      </p>
    </div>
  );
}

export default DrugCardInfo;
