import React from 'react';
import DrugCard from './DrugCard';

// component function to export

function DrugMatrix({ displayDrugList, updateDrugInfo, drugWarnings }) {
  // map through the drug data and return drug card array

  const drugCardList = (drugs) => {
    return drugs.map((drug) => (
      <DrugCard
        key={drug.id}
        drug={drug}
        updateDrugInfo={updateDrugInfo}
        drugWarnings={drugWarnings}
      />
    ));
  };

  return <div className='row g-3'>{drugCardList(displayDrugList)}</div>;
}

export default DrugMatrix;
