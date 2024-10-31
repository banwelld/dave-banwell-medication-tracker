import { useState } from 'react';
import WarningCheckbox from './WarningCheckbox';
import doAnyFetch from '../utils/fetchFunction';
import { drugBlueprint, drugWarnings } from '../utils/lists';

function AddDrug({ addNewDrugToState }) {
  // set state variables

  const [newDrugObj, setNewDrugObj] = useState(drugBlueprint);

  // function to check if a value is numeric

  const isNumeric = (string) => !isNaN(parseFloat(string)) && !isNaN(string);

  // event listener to set new drug data into state

  const handleInfoChange = (e) => {
    const { id, type, value, checked } = e.target;
    const numAdjustedValue = isNumeric(value) ? parseFloat(value) : value;
    const attributeVal = type === 'checkbox' ? checked : numAdjustedValue;
    setNewDrugObj({ ...newDrugObj, [id]: attributeVal });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doAnyFetch(addNewDrugToState, 'POST', newDrugObj);
    setNewDrugObj(drugBlueprint);
  };

  // select list arrays to populate options (if lists grow, consider housing on server)

  const doseUnitArr = ['', 'mg', 'ug', 'mcg', 'IU'];
  const drugFormatArr = ['', 'tablet', 'capsule', 'ml'];

  // function for mapping basic options lists

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
      checked={newDrugObj[warning.id]}
      handleInfoChange={handleInfoChange}
    />
  ));

  // render the add drug component

  return (
    <form className='p-3' onSubmit={handleFormSubmit}>
      <div className='row g-3'>
        <div className='col-2'>
          <label htmlFor='brandName' className='form-label'>
            Brand Name
          </label>
          <input
            type='text'
            className='form-control'
            id='brandName'
            value={newDrugObj.brandName}
            onChange={handleInfoChange}
          />
          <div id='brandNameHelp' className='form-text'>
            E.g., Lipitor
          </div>
        </div>
        <div className='col-3'>
          <label htmlFor='genericName' className='form-label'>
            Chemical Name
          </label>
          <input
            type='text'
            className='form-control'
            id='genericName'
            value={newDrugObj.genericName}
            onChange={handleInfoChange}
          />
          <div id='genericNameHelp' className='form-text'>
            E.g., Atorvastatin
          </div>
        </div>
        <div className='col'>
          <label htmlFor='doseVal' className='form-label'>
            Strength
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='doseVal'
            value={newDrugObj.doseVal}
            onChange={handleInfoChange}
          />
        </div>
        <div className='col-1'>
          <label htmlFor='doseUnits' className='form-label'>
            Units
          </label>
          <select
            id='doseUnits'
            className='form-select'
            value={newDrugObj.doseUnits}
            onChange={handleInfoChange}
          >
            {basicOptionList(doseUnitArr)}
          </select>
        </div>
        <div className='col'>
          <label htmlFor='dailyQty' className='form-label'>
            Daily Doses
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='dailyQty'
            value={newDrugObj.dailyQty}
            onChange={handleInfoChange}
          />
        </div>
        <div className='col'>
          Special Instructions
          <div className='btn-group mt-1'>
            <button
              className='btn text-light dropdown-toggle bg-blue'
              type='button'
              id='warningDropdown'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
            >
              &nbsp;&nbsp;&nbsp;Select All Applicable&nbsp;&nbsp;&nbsp;
            </button>
            <div className='dropdown-menu p-2' style={{ width: '20rem' }}>
              {drugWarningChecklist}
            </div>
          </div>
        </div>
      </div>
      <div className='row g-3 mt-3'>
        <div className='col-2'>
          <label htmlFor='qtyInStock' className='form-label'>
            Qty in Stock
          </label>
          <input
            type='number'
            step='1'
            className='form-control'
            id='qtyInStock'
            value={newDrugObj.qtyInStock}
            onChange={handleInfoChange}
          />
        </div>
        <div className='col-2'>
          <label htmlFor='drugFormat' className='form-label'>
            Format
          </label>
          <select
            id='drugFormat'
            className='form-select'
            value={newDrugObj.drugFormat}
            onChange={handleInfoChange}
          >
            {basicOptionList(drugFormatArr)}
          </select>
        </div>
        <div className='col-8'>
          <label className='form-label' htmlFor='imgUrl'>
            Link to Medication Image
          </label>
          <input
            type='text'
            className='form-control'
            id='imgUrl'
            value={newDrugObj.imgUrl}
            placeholder='E.g., http://www.image.com/image.jpg'
            onChange={handleInfoChange}
          />
        </div>
      </div>
      <div className='row g-3 mt-3'>
        <div className='col-12'>
          <button type='submit' className='btn text-light bg-blue'>
            Add Medication
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddDrug;
