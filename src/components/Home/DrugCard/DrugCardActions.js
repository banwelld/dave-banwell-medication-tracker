import React from 'react';
import { Link } from 'react-router-dom';
import doFetch from '../../../utils/fetchFunction';

function DrugCardActions({ drugId, currentSupply, setAllDrugData }) {
  // state update to be triggered by fetch request

  const updateArrayItemInState = (updatedItem) => {
    setAllDrugData((prevData) =>
      prevData.map((item) => (item.id === drugId ? updatedItem : item))
    );
  };

  // deduct 1 from the drug's current supply if current supply is available

  const takeNowClick = () => {
    if (!(currentSupply > 0)) {
      alert(
        "You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it."
      );
    } else {
      doFetch('PATCH', { currentSupply: currentSupply - 1 }, drugId).then(
        updateArrayItemInState
      );
    }
  };

  return (
    <div className='px-3 pb-3'>
      <button className='btn btn-blue shadow container' onClick={takeNowClick}>
        Take Now
      </button>
      <Link
        to={`/DrugInfo/${drugId}`}
        className='btn btn-secondary mt-3 shadow container'
      >
        View All Drug Info
      </Link>
    </div>
  );
}

export default DrugCardActions;
