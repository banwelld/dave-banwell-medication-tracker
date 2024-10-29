import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { drugNameSort } from '../utils/sortFilterFunctions';

function DrugActions() {
  // get all drug data from app component context

  const [allDrugData] = useOutletContext();

  // set state for selected drug (id: 0 allows for the "please select..." option as default)

  const [selectedDrug, setSelectedDrug] = useState(0);

  // sort drug data by name

  const allDrugsSorted = allDrugData.sort(drugNameSort);

  // create select option list for medications

  const drugOptions = allDrugsSorted.map((drug) => (
    <option key={drug.id} value={drug.id}>
      {drug.brandName} ( {drug.genericName} {drug.doseVal} {drug.doseUnits} )
    </option>
  ));

  // calculate the number of drugs in the list for the select element's height property

  const maxSelectHeight = drugOptions.length < 15 ? drugOptions.length : 15;

  // update state when user changes the select element

  const handleSelectChange = (e) => {
    const selectedDrugObj = allDrugData.find(
      (drug) => drug.id === parseInt(e.target.value)
    );
    setSelectedDrug(selectedDrugObj);
  };

  // render page jsx

  return (
    <>
      <div className='row g-3 mt-3'>
        <div className='col-12'>
          <h3>Adjust Medication Supply</h3>
        </div>
      </div>
      <div className='row g-3'>
        <div className='col-6'>
          <p className='text-secondary lead'>
            Please select the medication that you'd like to adjust:
          </p>
          <select
            className='form-select'
            size={maxSelectHeight}
            value={selectedDrug.id}
            onChange={(e) => handleSelectChange(e)}
          >
            {drugOptions}
          </select>
        </div>
        <div className='col-6'></div>
      </div>
    </>
  );
}
export default DrugActions;
