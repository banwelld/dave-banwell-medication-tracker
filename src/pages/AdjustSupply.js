import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { drugNameSort } from '../utils/helperFunctions';
import AdjustSupplyForm from '../components/AdjustSupplyComponents/AdjustSupplyForm';

function AdjustSupply() {
  // get all drug data from app component context

  const [allDrugData, setAllDrugData] = useOutletContext();

  // create object for the placeholder for the drug select field

  const optionPlaceholder = {
    id: 0,
    placeholder: 'Select a medication...',
  };

  // set state for drug selection

  const [selectedDrug, setSelectedDrug] = useState(optionPlaceholder);

  // sort drug data by name for the dropdown list options

  const allDrugDataSorted = allDrugData.sort(drugNameSort);

  // add an element to the list for the initial placeholder

  const optionsArray = [optionPlaceholder, ...allDrugDataSorted];

  // format the mapped list items

  const optionConstructor = (drug) => {
    const optionText =
      drug.id === 0
        ? drug.placeholder
        : ` ${drug.brandName} ( ${drug.genericName} ${drug.doseValue} ${drug.doseUnits} )`;
    return (
      <option key={drug.id} value={drug.id} disabled={!drug.id ? true : false}>
        {optionText}
      </option>
    );
  };

  // map drug selection list array

  const optionSelectList = optionsArray.map(optionConstructor);

  // update state when user changes the select element

  const handleSelectChange = (e) => {
    const selectedOption = allDrugData.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedDrug({ ...selectedOption });
  };

  // update adjusted item in state

  const updateItemInState = (updatedItem) => {
    setSelectedDrug({ ...updatedItem });
    setAllDrugData((prevData) =>
      prevData.map((item) => (item.id === selectedDrug.id ? updatedItem : item))
    );
  };

  // render adjust suply page

  return (
    <>
      <h3 className='my-3'>Adjust Medication Supply</h3>
      <div className='row'>
        <div className='col-6 bg-light rounded-3 shadow border'>
          <div className='row m-3'>
            <select
              className='form-select'
              value={selectedDrug.id}
              onChange={handleSelectChange}
            >
              {optionSelectList}
            </select>
          </div>
          {selectedDrug.id !== 0 && (
            <AdjustSupplyForm
              updateItemInState={updateItemInState}
              selectedDrug={selectedDrug}
              setAllDrugData={setAllDrugData}
              setSelectedDrug={setSelectedDrug}
              optionPlaceholder={optionPlaceholder}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default AdjustSupply;
