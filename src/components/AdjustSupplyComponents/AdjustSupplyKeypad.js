import React, { useState } from 'react';
import AdjustBtn from './KeypadButton';

function AdjustKeypad({
  setSupplyAdjustment,
  handleIncrementClick,
  handleDeleteDrugClick,
}) {
  // set state for delete button

  const [delBtnVisible, setDelBtnVisible] = useState(false);

  // button list constructor

  const buttonList = (valuesArray, colour, sign) => {
    return valuesArray.map((num) => (
      <AdjustBtn
        key={num}
        colour={colour}
        text={sign}
        step={num}
        onClick={() => handleIncrementClick(num)}
      />
    ));
  };

  // values arrays for plus/minus buttons

  const addBtnValues = [1, 10, 50];
  const minusBtnValues = [-1, -10, -50];

  // add and minus button lists

  const addBtnList = buttonList(addBtnValues, 'info', '+');
  const minusBtnList = buttonList(minusBtnValues, 'secondary', '-');

  // make delete button visible for five seconds

  const showDeleteButton = () => {
    setDelBtnVisible(true);
    setTimeout(() => setDelBtnVisible(false), 10000);
  };

  return (
    <>
      <div className='row m-3 justify-contents-center'>
        <div className='col'>{addBtnList}</div>
        <div className='col'>{minusBtnList}</div>
        <div className='col-5'>
          <button
            className='btn rounded-pill btn-success my-2 container shadow'
            type='submit'
            form='supply-adjust-form'
          >
            Submit Adjustment
          </button>
          <button
            className='btn rounded-pill btn-warning my-2 container shadow'
            type='button'
            onClick={() => setSupplyAdjustment(0)}
          >
            Reset Adjustment
          </button>
          <button
            className='btn rounded-pill btn-danger my-2 container shadow'
            type='button'
            onClick={showDeleteButton}
          >
            Remove Medication
          </button>
        </div>
      </div>
      {delBtnVisible && (
        <div className='row m-3 justify-contents-center'>
          <button
            className='btn rounded-pill btn-danger my-2 container shadow'
            type='button'
            onClick={handleDeleteDrugClick}
          >
            Click here to remove this medication from your file
          </button>
        </div>
      )}
    </>
  );
}

export default AdjustKeypad;
