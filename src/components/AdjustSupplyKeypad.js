import React from 'react';
import AdjustBtn from './KeypadButton';

const AdjustKeypad = ({ setAdjustment, handleIncrementClick }) => {
  // button list constructor

  const btnList = (valuesArray, colour, sign) => {
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

  const addBtnList = btnList(addBtnValues, 'info', '+');
  const minusBtnList = btnList(minusBtnValues, 'secondary', '-');

  return (
    <div className='row justify-contents-center'>
      <div className='col'>{addBtnList}</div>
      <div className='col'>{minusBtnList}</div>
      <div className='col'>
        <button
          className='btn rounded-pill btn-success my-2 container shadow'
          type='submit'
          form='supply-adjust-form'
        >
          Submit
        </button>
        <button
          className='btn rounded-pill btn-warning my-2 container shadow'
          type='button'
          onClick={() => setAdjustment(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AdjustKeypad;
