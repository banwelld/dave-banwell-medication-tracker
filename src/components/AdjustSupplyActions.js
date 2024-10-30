import React, { useState } from 'react';

function AdjustSupplyActions({ selectedDrug, setAdjustedSupply }) {
  // destructure drug properties from selectedDrug object

  const {
    brandName,
    genericName,
    doseVal,
    doseUnits,
    qtyInStock,
    drugFormat,
    dailyQty,
  } = selectedDrug;

  // set state for the adjustment value

  const [adjustment, setAdjustment] = useState(0);

  // local button component

  const AdjustBtn = ({ colour, text, step, onClick }) => {
    const btnShape = text !== '+' && text !== '-' && 'rounded-pill';

    return (
      <button
        className={`btn ${btnShape} ${colour} my-2 container shadow`}
        onClick={() => onClick(step)}
      >
        {text} {step && Math.abs(step)}
      </button>
    );
  };

  // callback for supply adjustment button clicks

  const handleAdjClick = (step) => {
    if (workingAdjustedSupply + step < 0) {
      alert('Cannot adjust stock below zero');
    } else {
      setAdjustment((prev) => prev + step || step);
    }
  };

  // callback for adjustment field change

  const handleAdjInputChange = (e) => {
    if (qtyInStock + parseInt(e.target.value) < 0) {
      alert('Cannot adjust stock below zero. Please start over');
      setAdjustment(0);
    } else {
      setAdjustment(parseInt(e.target.value));
    }
  };

  // get the working total for the adjusted supply

  const workingAdjustedSupply = adjustment + qtyInStock || qtyInStock;

  // get days supply variables

  const currentDaysSupply = parseInt(qtyInStock / dailyQty);
  const adjustmentDaysSupply = parseInt(adjustment / dailyQty) || 0;
  const workingAdjDaysSupply = parseInt(workingAdjustedSupply / dailyQty);

  if (!selectedDrug) return;

  return (
    <div className='col mx-2 bg-light rounded-3 shadow border'>
      <div className='row px-3 pt-3'>
        <div className='col'>
          <h5 className='fw-semibold'>{brandName}</h5>
          <p className='text-secondary'>
            {genericName} {doseVal} {doseUnits}
          </p>
        </div>
      </div>
      <div className='row px-3'>
        <div className='col'>
          <form onSubmit={console.log('hello world!')}>
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
                  (Days supply: {currentDaysSupply})
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
                  (Days supply: {adjustmentDaysSupply})
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
                  value={workingAdjustedSupply}
                  disabled
                />
                <div id='workingAdjSupplyHelp' className='form-text'>
                  (Days supply: {workingAdjDaysSupply})
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='row m-3 justify-contents-center'>
        <div className='col-4 px-2'>
          <AdjustBtn
            colour='btn-info'
            text='+'
            step={50}
            onClick={handleAdjClick}
          />
          <AdjustBtn
            colour='btn-info'
            text='+'
            step={10}
            onClick={handleAdjClick}
          />
          <AdjustBtn
            colour='btn-info'
            text='+'
            step={1}
            onClick={handleAdjClick}
          />
        </div>
        <div className='col-4 px-2'>
          <AdjustBtn
            colour='btn-secondary'
            text='-'
            step={-50}
            onClick={handleAdjClick}
          />
          <AdjustBtn
            colour='btn-secondary'
            text='-'
            step={-10}
            onClick={handleAdjClick}
          />
          <AdjustBtn
            colour='btn-secondary'
            text='-'
            step={-1}
            onClick={handleAdjClick}
          />
        </div>
        <div className='col-4 px-2'>
          <AdjustBtn colour='btn-success' text='Submit' />
          <AdjustBtn
            colour='btn-warning'
            text='Reset'
            onClick={() => setAdjustment(0)}
          />
          <AdjustBtn colour='btn-danger' text='Delete Drug' />
        </div>
      </div>
    </div>
  );
}

export default AdjustSupplyActions;
