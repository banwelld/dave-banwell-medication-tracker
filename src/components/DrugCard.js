import React from 'react';
import { Link } from 'react-router-dom';

function DrugCard({ updateDrug, drug: { id, imgUrl, brandName, genericName, dailyQty, inStock, isOptional } }) {

    // determine if refill needed

    const inStockNum = parseInt(inStock);
    const dailyQtyNum = parseInt(dailyQty);
    const daysRemaining = parseInt(inStockNum/dailyQtyNum);

    // change card background to indicate low or no stock

    const classNameWarn = () => {
        switch (true) {
            case daysRemaining === 0:
                return "card shadow mx-auto bg-danger";
            case daysRemaining <= 5:
                return "card shadow mx-auto bg-warning";
            default:
                return "card shadow mx-auto bg-light";
        };
    };

    // update drug data on click

    const takeNowClick = () => {
        if (!inStockNum) {
            alert("You do not have any of this medication in stock. Please visit the drug's info page to update your stock if you've refilled it.");
        } else {
            updateDrug(id, {inStock: inStockNum - 1});
        };
    };

    return (
        <div className="col-3 mt-3 mb-3">
            <div className={classNameWarn()} style={{width: "14rem"}}>
                <div className="row align-items-center p-1" style={{height: "14rem"}}>
                    <img src={imgUrl} className="card-img-top" alt={brandName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{brandName}</h5>
                    <h6 className="card-subtitle text-muted">{genericName}</h6>
                    <hr />
                        <p className="list-group-item mt-3 small">{dailyQty} dose{dailyQtyNum !== 1 && "s"} daily{isOptional && ", as needed"}</p>
                        <p className="list-group-item small">
                            Remaining Supply:
                            <br />
                            {inStock} dose{inStockNum !== 1 && "s"} ({daysRemaining} day{daysRemaining !== 1 && "s"});
                        </p>
                    <button
                        className="btn btn-dark shadow container"
                        onClick={takeNowClick}
                    >
                        Take Now
                    </button>
                    <Link to={`/DrugInfo/${id}`} className="btn btn-secondary mt-3 shadow container">View Drug Info</Link>
                </div>
            </div>
        </div>
    );
};

export default DrugCard;