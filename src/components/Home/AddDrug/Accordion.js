import React from 'react';
import AddDrug from './AddDrug';

function Accordion({ addNewItemToState }) {
  return (
    <div className='accordion my-3' id='homepageAccordion'>
      <div className='accordion-item'>
        <h2 className='accordion-header' id='accordionAddDrugHeader'>
          <button
            className='accordion-button btn-info text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse'
          >
            <strong>Add Medication to List</strong>
          </button>
        </h2>
        <div
          id='collapse'
          className='accordion-collapse collapse'
          data-bs-parent='#homepageAccordion'
        >
          <div className='accordion-body'>
            <AddDrug addNewItemToState={addNewItemToState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
