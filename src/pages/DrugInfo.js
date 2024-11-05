import React from 'react';
import { useParams } from 'react-router-dom';
import { drugWarnings } from '../utils/lists';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function DrugInfo() {
  // get drug data from app component outlet

  const [allDrugData] = useOutletContext();

  // get the parameter id

  const params = useParams();
  const targetDrugId = parseInt(params.id);

  // assign the drug object with the matching id to a variable

  const drugObject = allDrugData.find((drug) => drug.id === targetDrugId);

  // destructure drugObject

  const {
    imageLink,
    brandName,
    genericName,
    drugFormat,
    doseValue,
    doseUnits,
    dailyDoses,
    isOptional,
    currentSupply,
  } = drugObject;

  useDocumentTitle(`${brandName} ${doseValue}${doseUnits} Details`);

  // get day's supply (rounded down) from currentSupply and dailyDoses

  const daysSupply = parseInt(currentSupply / dailyDoses);

  // create a list of the drug's warnings and instructions

  const warningIdList = Object.keys(drugObject).filter(
    (key) => drugObject[key] === true && key !== 'isOptional'
  );

  const warningList = warningIdList.map((warningId) => {
    const displayWarning = drugWarnings.find(
      (warning) => warning.id === warningId
    );
    return <li key={displayWarning.id}>{displayWarning.labelText}</li>;
  });

  // render the component

  return (
    <>
      <h3 className='my-3 g-6'>Medication Details</h3>
      <div className='row'>
        <div className='col-4'>
          <h2 className='text-blue'>{brandName}</h2>
          <p className='text-secondary lead'>
            {genericName} ({doseValue} {doseUnits})
          </p>
          <h5 className='fw-semibold'>
            Take {dailyDoses} {drugFormat}
            {dailyDoses > 1 && 's'} daily
            {isOptional && ', as needed'}
          </h5>
          <p>
            Current Supply: {currentSupply} dose{currentSupply !== 1 && 's'} (
            {daysSupply} day{daysSupply !== 1 && 's'})
          </p>
          <div className='container bg-warning shadow rounded-3 border p-3'>
            <h5>
              {warningList.length > 0
                ? 'Warnings and Instructions'
                : 'No warnings for this medication'}
            </h5>
            <ul>{warningList}</ul>
          </div>
        </div>
        <div className='col-2'>
          <img
            src={imageLink}
            alt={brandName}
            className='drug-info-image img-fluid'
          />
        </div>
      </div>
    </>
  );
}

export default DrugInfo;
