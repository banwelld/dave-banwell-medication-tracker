import React from 'react';
import { Link } from 'react-router-dom';
import doAnyFetch from '../utils/fetchFunction';

function DrugCardActions({ drugId, qtyInStock, setAllDrugData }) {
  // update state after fetch request

  const updateArrayItemInState = (updatedItem) => {
    setAllDrugData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // deduct 1 from the drug's qtyInStock

  const takeNowClick = () => {
    console.log(updateArrayItemInState());
    if (!qtyInStock) {
      alert(
        "You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it."
      );
    } else {
      doAnyFetch(
        updateArrayItemInState,
        'PATCH',
        { qtyInStock: qtyInStock - 1 },
        drugId
      );
    }
  };

  return (
    <div className='p-3'>
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
