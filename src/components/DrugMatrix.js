import React from 'react';
import DrugCard from './DrugCard';

// component function to export

function DrugMatrix({ allDrugData, updateDrug }) {
  // map through the drug data and return drug card array

  const drugCardList = (drugs) => {
    return drugs.map((drug) => (
      <DrugCard key={drug.id} drug={drug} updateDrug={updateDrug} />
    ));
  };

  return <div className='row g-3'>{drugCardList(allDrugData)}</div>;
}

export default DrugMatrix;
