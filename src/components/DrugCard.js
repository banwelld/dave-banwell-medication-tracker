import React from 'react';

function DrugCard({ updateDrug, drug: { id, imgUrl, brandName, genericName, dailyQty, inStock, isOptional } }) {

    // determine if refill needed

    const inStockNum = parseInt(inStock);
    const dailyQtyNum = parseInt(dailyQty);
    const daysRemaining = parseInt(inStockNum/dailyQtyNum);

    // set background to warning if refill needed

    const classNameWarn = daysRemaining <= 5 ? "card shadow-sm mx-auto bg-warning" : "card shadow-sm mx-auto bg-light";

    // update drug data on click

    const takeNowClick = () => updateDrug(id, {inStock: inStockNum - 1});

    return (
        <div className="col-3 mt-3">
            <div className={classNameWarn} style={{width: "14rem"}}>
                <div className="row align-items-center p-1" style={{height: "14rem"}}>
                    <img src={imgUrl} className="card-img-top" alt={brandName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{brandName}</h5>
                    <h6 className="card-subtitle text-muted">{genericName}</h6>
                    <hr />
                        <p className="list-group-item mt-3 small">{dailyQty} dose(s) daily{isOptional && ", as needed"}</p>
                        <p className="list-group-item small">
                            Remaining Supply:
                            <br />
                            {inStock} doses ({daysRemaining} days)
                        </p>
                    <button
                        className="btn btn-primary shadow container"
                        onClick={takeNowClick}
                    >
                        Take now
                    </button>
                    <a href="http://facebook.com" className="btn btn-secondary mt-3 shadow container">View details</a>
                </div>
            </div>
        </div>
    );
};

export default DrugCard;