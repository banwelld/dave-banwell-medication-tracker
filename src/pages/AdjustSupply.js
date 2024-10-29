import React from 'react';
import { useOutletContext } from 'react-router-dom';

function DrugActions(drugList) {
  // get all drug data from app component context

  const [allDrugData, setAllDrugData] = useOutletContext();

  // create select option list for medications

  const drugOptions = allDrugData.map((drug) => (
    <option key={drug.id} value={drug.id}>
      {drug.brandName} ( {drug.genericName} {drug.doseVal} {drug.doseUnits} )
    </option>
  ));

  // render page jsx

  return (
    <div className='row m-3'>
      <div className='col-12'>
        <h2>Adjust Medication Supply</h2>
        <p className='text-secondary lead'>
          Please select the medication that you'd like to adjust:
        </p>
        <select className='form-control'>
          <option value='' disabled>
            Select a medication...
          </option>
          {drugOptions}
        </select>
      </div>
    </div>
  );
}
export default DrugActions;
