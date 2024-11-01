import React from 'react';

function DrugCardInfo({ drugObject }) {
  // destructure drugObject

  const {
    brandName,
    genericName,
    currentSupply,
    dailyDoses,
    drugFormat,
    isOptional,
  } = drugObject;

  // render drug card info component

  return (
    <div className='card-body'>
      <h5 className='card-title fw-semibold my-1'>{brandName}</h5>
      <p className='my-1'>{genericName}</p>
      <hr className='my-2' />
      <p className='list-group-item small my-0'>
        {dailyDoses} {drugFormat}(s) daily
        {isOptional && ', as needed'}
      </p>
      <p className='list-group-item fw-semibold small my-0'>
        Supply: {currentSupply} {drugFormat}(s)
      </p>
    </div>
  );
}

export default DrugCardInfo;
