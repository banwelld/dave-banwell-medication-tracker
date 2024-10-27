import React from 'react';
import { Link } from 'react-router-dom';

function DrugCard({
  updateDrug,
  drug: {
    id,
    imgUrl,
    brandName,
    genericName,
    doseVal,
    doseUnits,
    dailyQty,
    qtyInStock,
    isOptional,
  },
}) {
  // determine if refill needed

  const qtyInStockNum = parseInt(qtyInStock);
  const dailyQtyNum = parseInt(dailyQty);
  const daysRemaining = parseInt(qtyInStockNum / dailyQtyNum);

  // change card background to indicate low or no stock

  const classNameWarn = () => {
    switch (true) {
      case daysRemaining === 0:
        return 'card shadow mx-auto width-14 bg-danger';
      case daysRemaining <= 5:
        return 'card shadow mx-auto width-14 bg-warning';
      default:
        return 'card shadow mx-auto width-14 bg-light';
    }
  };

  // update drug data on click

  const takeNowClick = () => {
    if (!qtyInStockNum) {
      alert(
        "You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it."
      );
    } else {
      updateDrug(id, { inStock: qtyInStockNum - 1 });
    }
  };

  return (
    <article className='col-3 mt-3 mb-3'>
      <div className={classNameWarn()}>
        <div className='row align-items-center p-1 height-14'>
          <img src={imgUrl} className='card-img-top' alt={brandName} />
        </div>
        <div className='card-body'>
          <h5 className='card-title fw-semibold'>{brandName}</h5>
          <span className='tiny-text text-secondary'>{genericName}</span>
          <hr />
          <p className='list-group-item mt-3 small'>
            {dailyQty} dose{dailyQtyNum !== 1 && 's'} daily
            {isOptional && ', as needed'}
          </p>
          <p className='list-group-item small'>
            Supply Remaining:
            <br />
            {daysRemaining} day{daysRemaining !== 1 && 's'}
          </p>
          <button
            className='btn bg-blue shadow container'
            onClick={takeNowClick}
          >
            Take Now
          </button>
          <Link
            to={`/DrugInfo/${id}`}
            className='btn btn-secondary mt-3 shadow container'
          >
            View Drug Info
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DrugCard;
