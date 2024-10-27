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

  // get the drug's warnings and instructions

  const warningIdList = Object.keys(drugInfo).filter(
    (key) => drugInfo[key] === true && key !== 'isOptional'
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
        src={drugInfo.imgUrl}
        alt={drugInfo.brandName + 'image'}
        width='200px'
        className='mt-3 mb-3'
      />
      <h2 className='text-blue'>
        {drugInfo.brandName}
        <small>
          {' '}
          ({drugInfo.doseVal} {drugInfo.doseUnits})
        </small>
      </h2>
      <h3 className='text-secondary'>{drugInfo.genericName}</h3>
      <h5>
        Take {drugInfo.dailyQty} time{parseInt(drugInfo.dailyQty) > 1 && 's'},
        daily
        {drugInfo.isOptional && ', as needed'}
      </h5>
      <p>
        Personal Supply: {drugInfo.qtyInStock} dose
        {drugInfo.qtyInStock !== 1 && 's'} (
        {parseInt(drugInfo.qtyInStock / drugInfo.dailyQty)} day
        {parseInt(drugInfo.qtyInStock / drugInfo.dailyQty) !== 1 && 's'})
      </p>
      <h4 className='text-danger'>
        {warningList.length > 0 && 'Warnings and Additional Instructions'}
      </h4>
      <ul>{warningList}</ul>
    </div>
  );
}

export default DrugInfo;
