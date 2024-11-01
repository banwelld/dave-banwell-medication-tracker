import React, { useState } from 'react';
import WarningCheckbox from './WarningCheckbox';
import doFetch from '../../utils/fetchFunction';
import { drugBlueprint, drugWarnings } from '../../utils/lists';

function AddDrug({ addNewItemToState }) {
  // set the new drug blueprint to state

  const [newDrugObject, setNewDrugObject] = useState(drugBlueprint);

  // check if a field value is numeric

  const isNumeric = (string) => !isNaN(parseFloat(string)) && !isNaN(string);

  // ensure numeric values are set into state as numbers

  const ensureValueType = (value) =>
    isNumeric(value) ? parseFloat(value) : value;

  // set new drug data into state with proper values

  const handleFieldValueChange = (e) => {
    const { id, type, value, checked } = e.target;
    const typedValue = ensureValueType(value);
    const attribValue = type === 'checkbox' ? checked : typedValue;
    setNewDrugObject({ ...newDrugObject, [id]: attribValue });
  };

  // send new drug data to server, update state, and reset form with drug blueprint

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doFetch('POST', newDrugObject).then(addNewItemToState);
    setNewDrugObject(drugBlueprint);
  };

  // select list arrays to populate options (if lists grow, consider moving to helper file)

  const doseUnitArr = ['', 'mg', 'ug', 'mcg', 'IU'];
  const drugFormatArr = ['', 'tablet', 'capsule', 'ml'];

  // map basic options lists

  const basicOptionList = (listArray) =>
    listArray.map((listItem) => (
      <option key={listItem} value={listItem}>
        {listItem}
      </option>
    ));

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

  // render the add drug component

  return (
    <form className='p-3' onSubmit={handleFormSubmit}>
      <div className='row'>
        <div className='col-2'>
          <label htmlFor='brandName' className='form-label'>
            Brand Name
          </label>
          <input
            type='text'
            className='form-control'
            id='brandName'
            value={newDrugObject.brandName}
            onChange={handleFieldValueChange}
          />
          <div id='brandNameHelp' className='form-text'>
            E.g., Lipitor
          </div>
        </div>
        <div className='col-3'>
          <label htmlFor='genericName' className='form-label'>
            Generic/Chemical Name
          </label>
          <input
            type='text'
            className='form-control'
            id='genericName'
            value={newDrugObject.genericName}
            onChange={handleFieldValueChange}
          />
          <div id='genericNameHelp' className='form-text'>
            E.g., Atorvastatin
          </div>
        </div>
        <div className='col'>
          <label htmlFor='doseValue' className='form-label'>
            Strength
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='doseValue'
            value={newDrugObject.doseValue}
            onChange={handleFieldValueChange}
          />
        </div>
        <div className='col'>
          <label htmlFor='doseUnits' className='form-label'>
            Units
          </label>
          <select
            id='doseUnits'
            className='form-select'
            value={newDrugObject.doseUnits}
            onChange={handleFieldValueChange}
          >
            {basicOptionList(doseUnitArr)}
          </select>
        </div>
        <div className='col'>
          <label htmlFor='dailyDoses' className='form-label'>
            Daily Doses
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='dailyDoses'
            value={newDrugObject.dailyDoses}
            onChange={handleFieldValueChange}
          />
        </div>
        <div className='col-3'>
          <label htmlFor='warningDropdown' className='form-label'>
            Warnings/Instructions
          </label>
          <div className='btn-group container p-0'>
            <button
              className='btn text-light dropdown-toggle bg-blue'
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
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-2'>
          <label htmlFor='currentSupply' className='form-label'>
            Current Supply
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='currentSupply'
            value={newDrugObject.currentSupply}
            onChange={handleFieldValueChange}
          />
        </div>
        <div className='col-2'>
          <label htmlFor='drugFormat' className='form-label'>
            Format
          </label>
          <select
            id='drugFormat'
            className='form-select'
            value={newDrugObject.drugFormat}
            onChange={handleFieldValueChange}
          >
            {basicOptionList(drugFormatArr)}
          </select>
        </div>
        <div className='col-8'>
          <label className='form-label' htmlFor='imageLink'>
            Link to Medication Image
          </label>
          <input
            type='text'
            className='form-control'
            id='imageLink'
            value={newDrugObject.imageLink}
            onChange={handleFieldValueChange}
          />
          <div id='genericNameHelp' className='form-text'>
            E.g., http://www.image.com/image.jpg
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <button type='submit' className='btn text-light bg-blue'>
            Add Medication
          </button>
          <button
            type='reset'
            className='btn text-light bg-blue ms-3'
            onClick={() => setNewDrugObject({ ...drugBlueprint })}
          >
            Reset Form
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddDrug;
