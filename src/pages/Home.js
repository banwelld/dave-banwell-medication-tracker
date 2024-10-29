import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DrugCardMatrix from '../components/DrugCardMatrix';
import SearchFilter from '../components/SearchFilter';
import AddDrug from '../components/AddDrug';
import {
  drugNameSort,
  drugSupplySort,
  drugNameFilter,
} from '../utils/sortFilterFunctions';

function Home() {
  // get the drug data and setter callback from the app component's outlet

  const [allDrugData, setAllDrugData] = useOutletContext();

  // set state for sort and filter criteria

  const [filterCriteria, setFilterCriteria] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name'); // defaulted to 'name'

  // choose imported sort callback based on sort criteria

  const chooseSortCallback = () => {
    if (sortCriteria === 'name') {
      return drugNameSort;
    } else if (sortCriteria === 'supply') {
      return drugSupplySort;
    }
  };

  // sort drugs based on criteria

  const allDrugsSorted = allDrugData.sort(chooseSortCallback());

  // filter drugs by name for the final, working list

  const workingDrugList = allDrugsSorted.filter((drug) =>
    drugNameFilter(drug, filterCriteria)
  );

  // update drug card list wwith new drug

  const displayNewDrugObj = (newDrugObj) =>
    setAllDrugData((prevData) => [...prevData, newDrugObj]);

  // update drug card(s) with revised data

  const displayUpdatedDrug = (updatedDrug) =>
    setAllDrugData((prevData) =>
      prevData.map((drug) => (drug.id === updatedDrug.id ? updatedDrug : drug))
    );

  return (
    <>
      <div className='accordion mt-3 mb-3' id='homepageAccordion'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='accordionSearchHeader'>
            <button
              className='accordion-button text-light collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
            >
              <strong>Search/Filter Medication List</strong>
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse'
            data-bs-parent='#homepageAccordion'
          >
            <div className='accordion-body'>
              <SearchFilter
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
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
              <AddDrug displayNewDrugObj={displayNewDrugObj} />
            </div>
          </div>
        </div>
      </div>
      <div className='row text-center align-items-center justify-content-center m-4'>
        <h4 className='text-secondary'>Legend</h4>
        <div className='col-2 bg-warning text-dark'>Refill Soon</div>
        <div className='col-2 bg-danger text-light'>Refill Now!</div>
      </div>
      <DrugCardMatrix
        displayUpdatedDrug={displayUpdatedDrug}
        workingDrugList={workingDrugList}
      />
    </>
  );
}

export default Home;
