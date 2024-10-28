import React, { useState } from 'react';
import SelectOption from './SelectOption';
import WarningCheckbox from './WarningCheckbox';

function AddDrug({ renderNewDrug, drugWarningList, serverAddress }) {
  // initialize empty drug object

  const emptyDrugObj = {
    brandName: '',
    genericName: '',
    drugFormat: '',
    doseUnits: '',
    doseVal: '',
    qtyInStock: '',
    dailyQty: '',
    isOptional: false,
    withFood: false,
    withWater: false,
    fullStomach: false,
    emptyStomach: false,
    onSleep: false,
    onWake: false,
    avoidAlcohol: false,
    causesSleep: false,
    evenDosing: false,
    takeAll: false,
    dontStop: false,
    noDriving: false,
    imgUrl: '',
  };

  // declare state variables

  const [newDrug, setNewDrug] = useState(emptyDrugObj);

  // function to check if a value is numeric

  const isNumeric = (string) => !isNaN(parseFloat(string)) && !isNaN(string);

  // event listener to set new drug data into state

  const handleInfoChange = (e) => {
    //destructure e.target for readability
    const { id, type, value, checked } = e.target;
    const numAdjustedValue = isNumeric(value) ? parseFloat(value) : value;
    const attributeVal = type === 'checkbox' ? checked : numAdjustedValue;
    setNewDrug({ ...newDrug, [id]: attributeVal });
  };

  // send new drug to server

  const addNewDrug = () => {
    fetch(serverAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDrug),
    })
      .then((response) => response.json())
      .then((data) => renderNewDrug(data))
      .catch((error) => console.log(error));
  };

  // submit new drug data

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewDrug();
    setNewDrug(emptyDrugObj);
  };

  // select list arrays to populate options (if lists grow, consider housing on server)

  const doseUnitArr = [0, 'mg', 'ug', 'mcg', 'IU', 'mg/ml', 'ug/ml'];
  const drugFormatArr = [0, 'tablet', 'capsule', 'ml'];

  // mapped select lists

  const doseUnitList = doseUnitArr.map((listItem) => (
    <SelectOption key={listItem} listItem={listItem} />
  ));

  const drugFormatList = drugFormatArr.map((listItem) => (
    <SelectOption key={listItem} listItem={listItem} />
  ));

  // mapped list of warning checkboxes for the dropdown

  const drugWarningChecklist = drugWarningList.map((warning) => (
    <WarningCheckbox
      key={warning.id}
      id={warning.id}
      labelText={warning.labelText}
      checked={newDrug[warning.id]}
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
            value={newDrug.brandName}
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
            value={newDrug.genericName}
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
            value={newDrug.doseVal}
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
            value={newDrug.doseUnits}
            onChange={handleInfoChange}
          >
            {doseUnitList}
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
            value={newDrug.dailyQty}
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
            value={newDrug.qtyInStock}
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
            value={newDrug.drugFormat}
            onChange={handleInfoChange}
          >
            {drugFormatList}
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
            value={newDrug.imgUrl}
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
