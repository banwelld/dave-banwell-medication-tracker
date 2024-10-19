import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DrugInfo(state) {
  // set state variables to hold drug info

  const [drug, setDrug] = useState({});
  const [warnings, setWarnings] = useState([]);

  // get the parameter id

  const params = useParams();
  const drugId = params.drugId;

  // get the drug data from the API using the id

  const getDrug = (id) => {
    fetch(`http://localhost:6001/medications/${id}`)
      .then((response) => response.json())
      .then((data) => setDrug(data))
      .catch((error) => console.log(error));
  };

  // get the warning data from the API

  const getWarningData = () => {
    fetch('http://localhost:6001/warnings')
      .then((response) => response.json())
      .then((data) => setWarnings(data));
  };

  // fetch the drug and warning data when the component mounts

  useEffect(() => {
    getDrug(drugId);
    getWarningList();
  }, []);

  // create a list of the drug's warnings and instructions

  const getWarningList = (drugObj) => {
    return Object.keys(drugObj).filter((key) => drugObj[key] === true);
  };

  // filter the server's warning data for only the necessary warnings

  const warningDescriptionList = (drugObj) => {
    const warningList = getWarningList(drugObj);
    return warningList.map(
      (warningId) =>
        warnings.find((warning) => warning.id === warningId)?.description
    );
  };

  // render the warning descriptions

  const warningList = () => {
    return warningDescriptionList(drug).map((description, index) => (
      <li key={description}>{description}</li>
    ));
  };

  // render the drug info

  return (
    <div>
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
      <img src={drug.imgUrl} alt={drug.brandName + 'image'} />
      <p>Quantity Onhand: {drug.inStock}</p>
      <h3>Warnings and Additional Instructions</h3>
      <ul>{warningList}</ul>
    </div>
  );
}

export default DrugInfo;
