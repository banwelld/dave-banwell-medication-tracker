import React from 'react';
import DrugCard from './DrugCard/DrugCard';

function DrugMatrix({ workingDrugList, setAllDrugData }) {
  // map drug data to drug card array

  const drugCardList = workingDrugList.map((drugObject) => (
    <DrugCard
      key={drugObject.id}
      drugObject={drugObject}
      setAllDrugData={setAllDrugData}
    />
  ));

  // render the drug matrix component

  return <div className='row'>{drugCardList}</div>;
}

export default DrugMatrix;
