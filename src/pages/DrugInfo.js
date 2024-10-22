import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function DrugInfo() {
  // set state variables to hold drug info

  const [drug, setDrug] = useState({});

  // get drug warnings from context

  const drugWarnings = useOutletContext();

  // get the parameter id

  const params = useParams();
  const drugId = params.id;

  // get the drug data from the API using the id

  const getDrug = (id) => {
    fetch(`http://localhost:6001/medications/${id}`)
      .then((response) => response.json())
      .then((data) => setDrug(data))
      .catch((error) => console.log(error));
  };

  // fetch the drug and warning data when the component mounts

  useEffect(() => {
    getDrug(drugId);
  }, [drugId]);

  // get the drug's warnings and instructions

  const warningIdList = Object.keys(drug).filter(
    (key) => drug[key] === true && key !== 'isOptional'
  );

  const warningList = warningIdList.map((warningId) => {
    const displayWarning = drugWarnings.find(
      (warning) => warning.id === warningId
    );
    return <li key={displayWarning.id}>{displayWarning.labelText}</li>;
  });

  // render the drug info

  return (
    <div>
      <img
        src={drug.imgUrl}
        alt={drug.brandName + 'image'}
        width='200px'
        className='mt-3 mb-3'
      />
      <h2>
        {drug.brandName}
        <small>
          {' '}
          ({drug.doseVal} {drug.doseUnits})
        </small>
      </h2>
      <h3 className='text-secondary'>{drug.genericName}</h3>
      <h5>
        Take {drug.dailyQty} time{parseInt(drug.dailyQty) > 1 && 's'}, daily
        {drug.isOptional && ', as needed'}
      </h5>
      <p>
        Personal Supply: {drug.inStock} dose{drug.inStock != 1 && 's'} (
        {parseInt(drug.inStock / drug.dailyQty)} day
        {parseInt(drug.inStock / drug.dailyQty) !== 1 && 's'})
      </p>
      <h4 className='text-danger'>
        {warningList.length > 0 && 'Warnings and Additional Instructions'}
      </h4>
      <ul>{warningList}</ul>
    </div>
  );
}

export default DrugInfo;
