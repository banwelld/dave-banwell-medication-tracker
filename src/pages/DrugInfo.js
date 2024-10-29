import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOperation } from '../utils/utility-functions';
import { drugWarnings } from '../utils/lists';

function DrugInfo() {
  // set state variables to hold drug info

  const [drugInfo, setDrugInfo] = useState({});

  // get the parameter id

  const params = useParams();
  const drugId = params.id;

  // fetch the drug info when the component mounts

  useEffect(() => {
    fetchOperation((data) => setDrugInfo(data), 'GET', null, drugId);
  }, [drugId]);

  // destructure drugInfo

  const {
    imgUrl,
    brandName,
    genericName,
    drugFormat,
    doseVal,
    doseUnits,
    dailyQty,
    isOptional,
    qtyInStock,
  } = drugInfo;

  // get day's supply (rounded down) from qtyInStock and dailyQty

  const daysSupply = parseInt(qtyInStock / dailyQty);

  // create a list of the drug's warnings and instructions

  const warningIdList = Object.keys(drugInfo).filter(
    (key) => drugInfo[key] === true && key !== 'isOptional'
  );

  const warningList = warningIdList.map((warningId) => {
    const displayWarning = drugWarnings.find(
      (warning) => warning.id === warningId
    );
    return <li key={displayWarning.id}>{displayWarning.labelText}</li>;
  });

  // render the component

  return (
    <div>
      <img
        src={imgUrl}
        alt={brandName + 'image'}
        width='200px'
        className='mt-3 mb-3'
      />
      <h2 className='text-blue'>
        {brandName}
        <small>
          {' '}
          ({doseVal} {doseUnits})
        </small>
      </h2>
      <h5 className='text-secondary'>{genericName}</h5>
      <h5>
        Take {dailyQty} {drugFormat}
        {dailyQty > 1 && 's'} daily
        {isOptional && ', as needed'}
      </h5>
      <p>
        Personal Supply: {qtyInStock} dose{qtyInStock !== 1 && 's'} (
        {daysSupply} day{daysSupply !== 1 && 's'})
      </p>
      <h4 className='text-danger'>
        {warningList.length > 0 && 'Warnings and Additional Instructions'}
      </h4>
      <ul>{warningList}</ul>
    </div>
  );
}

export default DrugInfo;
