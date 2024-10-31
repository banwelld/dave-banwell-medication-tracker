import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { drugNameSort } from '../utils/helperFunctions';
import AdjustSupplyForm from '../components/AdjustSupplyForm';
import AdjustSupplyKeypad from '../components/AdjustSupplyKeypad';

function AdjustSupply() {
  // get all drug data from app component context

  const [allDrugData] = useOutletContext();

  // set state for selected drug and adjustment

  const [selectedDrug, setSelectedDrug] = useState('');
  const [adjustment, setAdjustment] = useState(0);

  // get supply data from selected drug

  const { qtyInStock } = selectedDrug;

  // calculate working total for the adjusted supply

  const newSupply = adjustment + qtyInStock || qtyInStock;

  // sort drug data by name

  const allDrugsSorted = allDrugData.sort(drugNameSort);

  // selection list for user to choose medication

  const drugOptionList = allDrugsSorted.map((drug) => (
    <option key={drug.id} value={drug.id}>
      {drug.brandName} ( {drug.genericName} {drug.doseVal} {drug.doseUnits} )
    </option>
  ));

  // update state when user changes the select element

  const handleSelectChange = (e) => {
    const selectedDrugObj = allDrugData.find(
      (drug) => drug.id === parseInt(e.target.value)
    );
    setSelectedDrug(selectedDrugObj);
  };

  // update adjustment amount when user clicks the increment buttons

  const handleIncrementClick = (step) => {
    if (newSupply + step < 0) {
      alert('Cannot adjust stock below zero');
    } else {
      setAdjustment((prev) => prev + step || step);
    }
  };

  // update item in state

  const updateItemInState = (updatedItem) => {
    setSelectedDrug({ ...updatedItem });
  };

  // render adjust suply page

  return (
    <>
      <h3 className='my-3'>Adjust Medication Supply</h3>
      <div className='row'>
        <div className='col-6 bg-light rounded-3 shadow border'>
          <div className='row'>
            <select
              className='form-select'
              value={selectedDrug.id || 'placeholder'}
              onChange={handleSelectChange}
            >
              <option value='placeholder' disabled>
                Select a medication...
              </option>
              {drugOptionList}
            </select>
          </div>
          <AdjustSupplyForm
            updateItemInState={updateItemInState}
            setAdjustment={setAdjustment}
            adjustment={adjustment}
            selectedDrug={selectedDrug}
            newSupply={newSupply}
          />
          <AdjustSupplyKeypad
            setAdjustment={setAdjustment}
            handleIncrementClick={handleIncrementClick}
          />
        </div>
      </div>
    </>
  );
}
export default AdjustSupply;
