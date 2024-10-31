import React from 'react';
import doAnyFetch from '../utils/fetchFunction';

function AdjustSupplyForm({
  selectedDrug,
  updateItemInState,
  setAdjustment,
  adjustment,
  newSupply,
}) {
  // destructure necessary data from selectedDrug

  const { qtyInStock, dailyQty } = selectedDrug;

  // calculate days supply for current, adjustment, and final supply values

  const currentSupplyDays = parseInt(qtyInStock / dailyQty);
  const adjustmentDays = parseInt(adjustment / dailyQty) || 0;
  const newSupplyDays = parseInt(newSupply / dailyQty);

  // submit data to server and update state when submit button clicked

  const handleSubmitClick = (e) => {
    e.preventDefault();
    doAnyFetch(
      updateItemInState,
      'PATCH',
      { qtyInStock: qtyInStock + adjustment },
      selectedDrug.id
    );
    setAdjustment(0);
  };

  // update adjustment about when user changes the data in the adjustment input field directly

  const handleAdjInputChange = (e) => {
    if (qtyInStock + parseInt(e.target.value) < 0) {
      alert('Cannot adjust stock below zero. Please start over');
      setAdjustment(0);
    } else {
      setAdjustment(parseInt(e.target.value));
    }
  };

  // render supply adjustment form

  return (
    <form id='supply-adjust-form' onSubmit={handleSubmitClick}>
      <div className='row'>
        <div className='col'>
          <label htmlFor='currentSupply' className='form-label'>
            Current Supply
          </label>
          <input
            type='number'
            className='form-control'
            id='currentSupply'
            value={qtyInStock}
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
            value={adjustment}
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
  );
}

export default AdjustSupplyForm;
