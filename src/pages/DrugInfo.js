import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function DrugInfo() {
  // set state variables to hold drug info

  const [drugInfo, setDrugInfo] = useState({});

  // get drug warnings from context

  const drugWarnings = useOutletContext();

  // get the parameter id

  const params = useParams();
  const drugId = params.id;

  // get the drug data from the API using the id

  const getDrug = (id) => {
    fetch(`http://localhost:6001/medications/${id}`)
      .then((response) => response.json())
      .then((data) => setDrugInfo(data))
      .catch((error) => console.log(error));
  };

  // fetch the drug and warning data when the component mounts

  useEffect(() => {
    getDrug(drugId);
  }, [drugId]);

  // destructure drugInfo for jsx readability

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

  // get day's supply from qtyInStock and dailyQty

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
