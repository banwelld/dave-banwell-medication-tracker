import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DrugCardMatrix from '../components/DrugCardMatrix';
import SearchFilter from '../components/SearchFilter';
import AddDrug from '../components/AddDrug';

function Home() {
  // set state to hold drug, sort, search/filter data

  const [allDrugData, setAllDrugData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name');

  // get drug warning list from context

  const drugWarningList = useOutletContext();

  // assign server url to variable

  const serverAddress = 'http://localhost:6001/medications/';

  // retrieve data from api and set into state

  const getAllDrugData = () => {
    fetch(serverAddress)
      .then((response) => response.json())
      .then((data) => setAllDrugData(data))
      .catch((error) => console.log(error));
  };

  // trigger fetch of drug data on component mount

  useEffect(() => {
    getAllDrugData();
  }, []);

  // declare sort callback functions

  const drugNameSort = (a, b) => a.brandName.localeCompare(b.brandName);
  const drugSupplySort = (a, b) =>
    parseInt(a.inStock / a.dailyQty) - parseInt(b.inStock / b.dailyQty);

  // select sort callback based on sort criteria

  const sortLogic = () => {
    if (sortCriteria === 'name') {
      return drugNameSort;
    } else if (sortCriteria === 'supply') {
      return drugSupplySort;
    }
  };

  // sort drugs based on criteria

  const allDrugsSorted = allDrugData.sort(sortLogic());

  // filter drugs based on brand or generic name

  const filterDrugList = (drugList) =>
    drugList.filter(
      (drug) =>
        drug.brandName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(nameFilter.toLowerCase())
    );

  // combine sort and filter to generate display list

  const displayDrugList = filterDrugList(allDrugsSorted);

  // add drugs from AddDrug module to allDrugData

  const renderNewDrug = (drugObj) =>
    setAllDrugData((prevData) => [...prevData, drugObj]);

  // send drug update to server

  const updateDrugInfo = (id, updateObj) => {
    fetch(`${serverAddress}}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateObj),
    })
      .then((response) => response.json())
      .then((drug) => {
        setAllDrugData((prevDrugData) =>
          prevDrugData.map((d) => (d.id === drug.id ? drug : d))
        );
      })
      .catch((error) => console.log(error));
  };

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
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
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
              <AddDrug
                renderNewDrug={renderNewDrug}
                drugWarningList={drugWarningList}
                serverAddress={serverAddress}
              />
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
        updateDrugInfo={updateDrugInfo}
        displayDrugList={displayDrugList}
      />
    </>
  );
}

export default Home;
