import React from 'react';

function WarningCheckbox({ id, labelText, checked, handleInfoChange }) {
  return (
    <div className='form-check mt-0 mb-0'>
      <input
        type='checkbox'
        className='form-check-input'
        id={id}
        checked={checked}
        onChange={handleInfoChange}
      />
      <label className='form-check-label small' htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
}

export default WarningCheckbox;
