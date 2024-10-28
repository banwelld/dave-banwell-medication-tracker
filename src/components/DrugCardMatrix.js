import React from 'react';
import DrugCard from './DrugCard';

// component function to export

function DrugMatrix({ displayDrugList, updateDrugInfo, drugWarnings }) {
  // map through the drug data and return drug card array

  const drugCardList = displayDrugList.map((drugObj) => (
    <DrugCard
      key={drugObj.id}
      drugObj={drugObj}
      updateDrugInfo={updateDrugInfo}
      drugWarnings={drugWarnings}
    />
  ));

  return <div className='row g-3'>{drugCardList}</div>;
}

export default DrugMatrix;
