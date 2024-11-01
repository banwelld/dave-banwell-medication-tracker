import React, { useState } from 'react';
import doAnyFetch from '../../utils/fetchFunction';
import AdjustSupplyKeypad from './AdjustSupplyKeypad';

function AdjustSupplyForm({
  selectedDrug,
  updateItemInState,
  setAllDrugData,
  setSelectedDrug,
  optionPlaceholder,
}) {
  // set state for supply adjustment amount

  const [supplyAdjustment, setSupplyAdjustment] = useState(0);

  // destructure necessary data from selectedDrug

  const { currentSupply, dailyDoses } = selectedDrug;

  // calculate working total for the adjusted supply

  const newSupply =
    supplyAdjustment + currentSupply >= 0
      ? supplyAdjustment + currentSupply
      : currentSupply;

  // calculate days supply for current, supplyAdjustment, and final supply values

  const currentSupplyDays = parseInt(currentSupply / dailyDoses);
  const adjustmentDays = parseInt(supplyAdjustment / dailyDoses) || 0; // handles instances where supplyAdjustment is blank
  const newSupplyDays = parseInt(newSupply / dailyDoses);

  // submit data to server and update state when submit button clicked

  const handleSubmitClick = (e) => {
    e.preventDefault();
    doAnyFetch(
      updateItemInState,
      'PATCH',
      { currentSupply: currentSupply + supplyAdjustment },
      selectedDrug.id
    );
    setSupplyAdjustment(0);
  };

  // callback to enable fetch request to update state
  const removeItemsFromState = () => {
    setAllDrugData((prev) =>
      prev.filter((item) => item.id !== parseInt(selectedDrug.id))
    );
    setSelectedDrug(optionPlaceholder);
    setSupplyAdjustment(0);
  };

  // delete drug record from server and trigger state changes

  const handleDeleteDrugClick = () =>
    doAnyFetch(removeItemsFromState, 'DELETE', null, selectedDrug.id);

  // update adjustment amount when user changes the adjustment field

  const handleAdjInputChange = (e) => {
    if (currentSupply + parseInt(e.target.value) < 0) {
      alert('Cannot adjust stock below zero. Please start over');
      setSupplyAdjustment(0);
    } else {
      setSupplyAdjustment(parseInt(e.target.value));
    }
  };

  // update adjustment amount when user clicks the increment buttons

  const handleIncrementClick = (step) => {
    if (newSupply + step < 0) {
      alert('Supply cannot be less than zero');
    } else {
      setSupplyAdjustment((prev) => prev + step || step); // handles instances where supplyAdjustment is blank
    }
  };

  // render supply adjustment form

  return (
    <>
      <form
        id='supply-adjust-form'
        className='mx-3'
        onSubmit={handleSubmitClick}
      >
        <div className='row'>
          <div className='col'>
            <label htmlFor='currentSupply' className='form-label'>
              Current Supply
            </label>
            <input
              type='number'
              className={`form-control ${
                currentSupplyDays <= 5 && 'bg-warning'
              }`}
              id='currentSupply'
              value={currentSupply}
              disabled
            />
            <div id='supplyHelp' className='form-text'>
              (Days supply: {currentSupplyDays})
            </div>
          </div>
          <div className='col'>
            <label htmlFor='actualAdjustment' className='form-label'>
              Adjustment
            </label>
            <input
              type='number'
              className='form-control'
              id='actualAdjustment'
              value={supplyAdjustment}
              onChange={handleAdjInputChange}
            />
            <div id='adjustmentHelp' className='form-text'>
              (Days supply: {adjustmentDays})
            </div>
          </div>
          <div className='col'>
            <label htmlFor='workingAdjSupply' className='form-label'>
              Adjusted Supply
            </label>
            <input
              type='number'
              className='form-control'
              id='workingAdjSupply'
              value={newSupply}
              disabled
            />
            <div id='workingAdjSupplyHelp' className='form-text'>
              (Days supply: {newSupplyDays})
            </div>
          </div>
        </div>
      </form>
      <AdjustSupplyKeypad
        setSupplyAdjustment={setSupplyAdjustment}
        handleIncrementClick={handleIncrementClick}
        handleDeleteDrugClick={handleDeleteDrugClick}
      />
    </>
  );
}

export default AdjustSupplyForm;
