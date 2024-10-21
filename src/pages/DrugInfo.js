import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

function DrugInfo() {
  // set state variables to hold drug info

  const [drug, setDrug] = useState({});

  // get drug warnings from context

  const drugWarnings = useOutletContext();

  console.log(drugWarnings);

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

  const warningIdList = Object.keys(drug).filter((key) => drug[key] === true);

  // render the drug info

  return (
    <div>
      <img src={drug.imgUrl} alt={drug.brandName + 'image'} width='200px' />
      <h2>
        {drug.brandName}
        <small>
          {' '}
          ({drug.doseVal} {drug.doseUnits})
        </small>
      </h2>
      <h3>{drug.genericName}</h3>
      <h5>
        Take {drug.dailyQty} time{parseInt(drug.dailyQty) > 1 && 's'}, daily
        {drug.isOptional && ', as needed'}
      </h5>
      <p>Quantity Onhand: {drug.inStock}</p>
      <h3>Warnings and Additional Instructions</h3>
      <ul>{warningList(drug)}</ul>
    </div>
  );
}

export default DrugInfo;
