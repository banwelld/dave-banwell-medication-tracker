import React from 'react';

function DrugCard({ drug: { imgUrl, brandName, genericName, intervalHours, doseVal, doseUnit, dailyDoses, isOptional, lastDoseTs } }) {

    return (
        <div className="card shadow-sm" style={{width: "12rem"}}>
            <img src={imgUrl} className="card-img-top" alt={brandName} />
            <div className="card-body bg-light">
                <h5 className="card-title">{brandName}</h5>
                <h6 className="card-subtitle text-muted">{genericName}</h6>
                <hr />
                    <p className="list-group-item bg-light mt-3 small">{dailyDoses} dose(s) daily{isOptional && ", as needed"}</p>
                    <p className="list-group-item bg-light small">
                        Last dose:
                        <br />
                        {lastDoseTs}
                    </p>
                <a href="http://facebook.com" className="btn btn-info shadow container">Take it now</a>
                <a href="http://facebook.com" className="btn btn-secondary mt-3 shadow container">View details</a>
            </div>
        </div>
    );
};

export default DrugCard;