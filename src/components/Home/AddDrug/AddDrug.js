import React, { useState } from 'react';
import doFetch from '../../../utils/fetchFunction';
import { drugBlueprint } from '../../../utils/lists';
import WarningSelect from './WarningSelect';
import MessageModal from '../../Modals/MessageModal';
import { modalContent } from '../../../utils/lists';

function AddDrug({ addNewItemToState }) {
  // set the state for the error modal and the drug template

  const [newDrugObject, setNewDrugObject] = useState(drugBlueprint);
  const [emptyFieldsModalOpen, setEmptyFieldsModalOpen] = useState(false);

  // get the empty fields modal messages from modalContent

  const emptyFieldsModalContent = modalContent.AddDrug.emptyFields;

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

  // track the empty, non-boolean fields

  const nonBooleanKeys = Object.keys(newDrugObject).filter(
    (key) => typeof newDrugObject[key] !== 'boolean'
  );

  const falseyNonBoolean = nonBooleanKeys.filter((key) => {
    const value = newDrugObject[key];
    return !value && value !== 'false';
  });

  // send new drug data to server, update state, and reset form with drug blueprint

  const handleFormSubmit = (e) => {
    if (!falseyNonBoolean.length) {
      e.preventDefault();
      doFetch('POST', newDrugObject).then(addNewItemToState);
      setNewDrugObject(drugBlueprint);
    } else {
      e.preventDefault();
      setEmptyFieldsModalOpen(true);
    }
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

  // render the add drug component

  return (
    <>
      <form className='p' onSubmit={handleFormSubmit}>
        <div className='row'>
          <div className='col-3'>
            <label htmlFor='brandName' className='form-label'>
              Brand Name (e.g., Lipitor)
            </label>
            <input
              type='text'
              className='form-control home-input'
              id='brandName'
              value={newDrugObject.brandName}
              onChange={handleFieldValueChange}
            />
          </div>
          <div className='col-3'>
            <label htmlFor='genericName' className='form-label'>
              Generic Name (e.g., Atorvastatin)
            </label>
            <input
              type='text'
              className='form-control home-input'
              id='genericName'
              value={newDrugObject.genericName}
              onChange={handleFieldValueChange}
            />
          </div>
          <div className='col'>
            <label htmlFor='doseValue' className='form-label'>
              Strength
            </label>
            <input
              type='number'
              step='1'
              className='form-control home-input'
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
              className='form-select home-input'
              value={newDrugObject.doseUnits}
              onChange={handleFieldValueChange}
            >
              {basicOptionList(doseUnitArr)}
            </select>
          </div>
          <div className='col-3'>
            <WarningSelect
              handleFieldValueChange={handleFieldValueChange}
              newDrugObject={newDrugObject}
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-2'>
            <label htmlFor='dailyDoses' className='form-label'>
              Daily Doses
            </label>
            <input
              type='number'
              step='1'
              className='form-control home-input'
              id='dailyDoses'
              value={newDrugObject.dailyDoses}
              onChange={handleFieldValueChange}
            />
          </div>
          <div className='col-2'>
            <label htmlFor='drugFormat' className='form-label'>
              Format
            </label>
            <select
              id='drugFormat'
              className='form-select home-input'
              value={newDrugObject.drugFormat}
              onChange={handleFieldValueChange}
            >
              {basicOptionList(drugFormatArr)}
            </select>
          </div>
          <div className='col-2'>
            <label htmlFor='currentSupply' className='form-label'>
              Current Supply
            </label>
            <input
              type='number'
              step='1'
              className='form-control home-input'
              id='currentSupply'
              value={newDrugObject.currentSupply}
              onChange={handleFieldValueChange}
            />
          </div>
          <div className='col'>
            <label className='form-label' htmlFor='imageLink'>
              Link to Medication Image
            </label>
            <input
              type='text'
              className='form-control home-input'
              id='imageLink'
              value={newDrugObject.imageLink}
              onChange={handleFieldValueChange}
            />
            <div id='genericNameHelp' className='form-text'>
              <small>E.g., http://www.image.com/image.jpg</small>
            </div>
          </div>
        </div>
        <div className='d-grid mt-3 gap-2 d-md-flex justify-content-md-end'>
          <button type='submit' className='btn me-3 text-light btn-blue'>
            Add Medication
          </button>
          <button
            type='reset'
            className='btn text-light btn-blue'
            onClick={() => setNewDrugObject({ ...drugBlueprint })}
          >
            Reset Form
          </button>
        </div>
      </form>
      <MessageModal
        isOpen={emptyFieldsModalOpen}
        content={emptyFieldsModalContent}
        close={() => setEmptyFieldsModalOpen(false)}
      />
    </>
  );
}

export default AddDrug;
