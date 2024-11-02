import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DrugCardMatrix from '../components/Home/DrugDisplay';
import SortFilter from '../components/Home/SortFilter';
import Accordion from '../components/Home/AddDrug/Accordion';
import {
  drugNameSort,
  drugSupplySort,
  drugNameFilter,
} from '../utils/helperFunctions';
import '../css/Home.css';

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

  // add new drug to state

  const addNewItemToState = (item) => setAllDrugData((prev) => [...prev, item]);

  // render the home page component

  return (
    <>
      <div className='row mt-3 justify-content-center align-items-center'>
        <SortFilter
          drugSortCriteria={drugSortCriteria}
          setDrugSortCriteria={setDrugSortCriteria}
          drugFilterCriteria={drugFilterCriteria}
          setDrugFilterCriteria={setDrugFilterCriteria}
        />
      </div>
      <div className='row px-3 justify-content-center align-items-center'>
        <Accordion addNewItemToState={addNewItemToState} />
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
