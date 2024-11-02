import React from 'react';
import WarningCheckbox from './WarningCheckbox';
import { drugWarnings } from '../../../utils/lists';

function WarningSelect({ newDrugObject, handleFieldValueChange }) {
  // mapped list of warning checkboxes for the dropdown

  const drugWarningChecklist = drugWarnings.map((warning) => (
    <WarningCheckbox
      key={warning.id}
      id={warning.id}
      labelText={warning.labelText}
      checked={newDrugObject[warning.id]}
      handleFieldValueChange={handleFieldValueChange}
    />
  ));

  // render the warning selector component

  return (
    <>
      <label htmlFor='warningDropdown' className='form-label'>
        Warnings/Instructions
      </label>
      <div className='btn-group container p-0'>
        <button
          className='btn text-light dropdown-toggle btn-blue'
          type='button'
          id='warningDropdown'
          data-bs-toggle='dropdown'
          data-bs-auto-close='outside'
        >
          Select All Applicable
        </button>
        <div className='dropdown-menu p-2 warning-dropdown'>
          {drugWarningChecklist}
        </div>
      </div>
    </>
  );
}

export default WarningSelect;
