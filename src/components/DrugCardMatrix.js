import React from 'react';
import DrugCard from './DrugCard';

// component function to export

function DrugMatrix({ workingDrugList, setAllDrugData }) {
  // map through the drug data and return drug card array

  const drugCardList = workingDrugList.map((drugObj) => (
    <DrugCard
      key={drugObj.id}
      drugObj={drugObj}
      setAllDrugData={setAllDrugData}
    />
  ));

  return <div className='row g-3'>{drugCardList}</div>;
}

export default DrugMatrix;
