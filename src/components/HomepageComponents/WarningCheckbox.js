import React from 'react';

function WarningCheckbox({ id, labelText, checked, handleFieldValueChange }) {
  return (
    <div className='form-check my-0'>
      <input
        type='checkbox'
        className='form-check-input'
        id={id}
        checked={checked}
        onChange={handleFieldValueChange}
      />
      <label className='form-check-label small' htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
}

export default WarningCheckbox;
