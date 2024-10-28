import React from 'react';
import { Link } from 'react-router-dom';

function DrugCardActions({ drugId, qtyInStock, updateDrug }) {
  // deduct 1 from the drug's qtyInStock on click

  const takeNowClick = () => {
    if (!qtyInStock) {
      alert(
        "You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it."
      );
    } else {
      updateDrug(drugId, { inStock: qtyInStock - 1 });
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
        View Drug Info
      </Link>
    </div>
  );
}

export default DrugCardActions;
