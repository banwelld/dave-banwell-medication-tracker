import React from 'react';
import { Link } from 'react-router-dom';
import { fetchOperation } from '../utils/utility-functions';

function DrugCardActions({ drugId, qtyInStock, displayUpdatedDrug }) {
  // deduct 1 from the drug's qtyInStock on click

  const takeNowClick = () => {
    if (!qtyInStock) {
      alert(
        "You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it."
      );
    } else {
      fetchOperation(
        displayUpdatedDrug,
        'PATCH',
        { qtyInStock: qtyInStock - 1 },
        drugId
      );
    }
  };

  return (
    <div className='p-3'>
      <button className='btn bg-blue shadow container' onClick={takeNowClick}>
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
