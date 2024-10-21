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

  // get drug warnings from context

  const drugWarnings = useOutletContext();

  // retrieve data from api and set into state

  const getAllDrugData = () => {
    fetch('http://localhost:6001/medications')
      .then((response) => response.json())
      .then((data) => setAllDrugData(data))
      .catch((error) => console.log(error));
  };

  // trigger fetch of drug data on component mount

  useEffect(() => {
    getAllDrugData();
  }, []);

  // sort and filter drug data

  const sortDrugList = (drugList) => {
    return drugList.sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.brandName.localeCompare(b.brandName);
      } else if (sortCriteria === 'supply') {
        return (
          parseInt(a.inStock / a.dailyQty) - parseInt(b.inStock / b.dailyQty)
        );
      }
    });
  };

  const filterDrugList = (drugList) => {
    return drugList.filter(
      (drug) =>
        drug.brandName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  };

  // combine sort and filter to generate display list

  const displayDrugList = (drugList) => filterDrugList(sortDrugList(drugList));

  // add drugs from AddDrug module to allDrugData

  const renderNewDrug = (drugObj) =>
    setAllDrugData((prevData) => [...prevData, drugObj]);

  // send drug update to server

  const updateDrug = (id, updateObj) => {
    fetch(`http://localhost:6001/medications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateObj),
    })
      .then((response) => response.json())
      .then((updatedDrug) => {
        setAllDrugData((prevData) =>
          prevData.map((d) => (d.id === updatedDrug.id ? updatedDrug : d))
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
              style={{ backgroundColor: '#54B4D3', outline: 'none' }}
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
                sort={sortCriteria}
                getSort={setSortCriteria}
                filter={nameFilter}
                getFilter={setNameFilter}
              />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='accordionAddDrugHeader'>
            <button
              className='accordion-button text-light collapsed'
              style={{ backgroundColor: '#54B4D3', outline: 'none' }}
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
                drugWarnings={drugWarnings}
              />
            </div>
          </div>
        </div>
      </div>
      <DrugCardMatrix
        updateDrug={updateDrug}
        allDrugData={displayDrugList(allDrugData)}
      />
    </>
  );
}

export default Home;
