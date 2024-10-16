import React from "react";

function SearchFilter() {
    return (
        <div className="container">
            <div className="row g-3 mt-2">
                <div className="col-5 m-2">
                    <div className="row justify-contents-center g-3 mb-2">
                        <input type="text" className="form-control" placeholder="Search by brand name..." />
                    </div>
                    <div className="row justify-contents-center g-3">
                        <input type="text" className="form-control" placeholder="Search by generic name..." />
                    </div>
                </div>
                <div className="col-3 m-2">
                    <div className="row justify-contents-center g-3 mb-2 offset-2">
                        <input type="radio" className="btn-check" name="sortBtn" id="nextUp" autocomplete="off" defaultChecked />
                        <label className="btn btn-outline-primary" htmlFor="nextUp">Take Next Sort</label>
                    </div>
                    <div className="row justify-contents-center g-3 offset-2">
                        <input type="radio" className="btn-check" name="sortBtn" id="brandSort" autocomplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="brandSort">Brand Name Sort</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;