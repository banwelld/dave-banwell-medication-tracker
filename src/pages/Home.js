import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DrugCardMatrix from '../components/Home/DrugCardMatrix';
import SortFilter from '../components/Home/SortFilter';
import AddDrug from '../components/Home/AddDrug';
import {
  drugNameSort,
  drugSupplySort,
  drugNameFilter,
} from '../utils/helperFunctions';

function Home() {
  // get the drug data state variables from the app component

  const [allDrugData, setAllDrugData] = useOutletContext();

  // set state for sort and filter criteria

  const [drugFilterCriteria, setDrugFilterCriteria] = useState('');
  const [drugSortCriteria, setDrugSortCriteria] = useState('name');

  // sort drugs based on criteria

  const allDrugDataSorted = allDrugData.sort(
    drugSortCriteria === 'name' ? drugNameSort : drugSupplySort
  );

  // filter drugs by name for the final, working list

  const workingDrugList = allDrugDataSorted.filter((drug) =>
    drugNameFilter(drug, drugFilterCriteria)
  );

  // update drug card list wwith new drug

  const addNewItemToState = (newDrugObject) =>
    setAllDrugData((prevData) => [...prevData, newDrugObject]);

  // render the home page component

  return (
    <>
      <div className='accordion my-3' id='homepageAccordion'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='accordionSearchHeader'>
            <button
              className='accordion-button text-light collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
            >
              <strong>Sort or Filter Medication List</strong>
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse'
            data-bs-parent='#homepageAccordion'
          >
            <div className='accordion-body'>
              <SortFilter
                drugSortCriteria={drugSortCriteria}
                setDrugSortCriteria={setDrugSortCriteria}
                drugFilterCriteria={drugFilterCriteria}
                setDrugFilterCriteria={setDrugFilterCriteria}
              />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='accordionAddDrugHeader'>
            <button
              className='accordion-button text-light collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
            >
              <strong>Add Medication to List</strong>
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            data-bs-parent='#homepageAccordion'
          >
            <div className='accordion-body'>
              <AddDrug addNewItemToState={addNewItemToState} />
            </div>
          </div>
        </div>
      </div>
      <div className='row text-center align-items-center justify-content-center m-4'>
        <p className='text-secondary lead'>Legend</p>
        <div className='col-2 bg-warning text-dark'>Refill Soon</div>
        <div className='col-2 bg-danger text-light'>Refill Now!</div>
      </div>
      <DrugCardMatrix
        setAllDrugData={setAllDrugData}
        workingDrugList={workingDrugList}
      />
    </>
  );
}

export default Home;
