import React, { useState, useEffect } from "react";
import CautionBox from "../components/CautionBox";

function AddDrug() {

    // state variables for form inputs

    const [warnings, setWarnings] = useState([]);

    // function to fetch warnings from API

    const getWarnings = () => {
        fetch("http://localhost:6001/warnings")
            .then((response) => response.json())
            .then((data) => setWarnings(data))
            .catch((error) => console.log(error));
    };

    // useEffect to load warnings into state on component mount

    useEffect(() => getWarnings(), []);

    // function to create a list of warning checkboxes for the form

    const checkboxList = () => {
        return warnings.map((warning) => (
            <CautionBox key={warning.id} boxId={warning.id} labelText={warning.labelText} />
        ));
    };

    return (
        <>
            <h2 className="mt-2">Add New Medication</h2>
            <div className="border border-2 border-info rounded-3 mb-3">
                <form className="p-3">
                    <h4 className="text-info">Drug Name</h4>
                    <div className="row g-3 p-3 mb-3">
                        <div className="col-4">
                            <label for="brandName" className="form-label">Brand Name</label>
                            <input type="text" className="form-control" id="brandName" />
                            <div id="brandNameHelp" className="form-text">E.g., Lipitor, Zithromax, Prilosec</div>
                        </div>
                        <div className="col-4">
                            <label for="genericName" className="form-label">Generic/Chemical Name</label>
                            <input type="text" className="form-control" id="genericName" />
                            <div id="genericNameHelp" className="form-text">E.g., Atorvastatin, Azithromycin, Omeprazole</div>
                        </div>
                        <div className="col-2">
                            <label for="doseVal" className="form-label">Dose Quantity</label>
                            <input type="number" step="1" className="form-control" id="doseVal" />
                        </div>
                        <div className="col-2">
                            <label for="doseUnits" className="form-label">Units</label>
                            <select id="doseUnits" class="form-select">
                                <option selected>mg</option>
                                <option value="1">ug</option>
                                <option value="2">ml</option>
                                <option value="3">IU</option>
                            </select>
                        </div>
                    </div>
                    <h4 className="mt-3 text-info">Instructions</h4>
                    <div className="row g-3 p-3">
                        <div className="col-4">
                            <div className="input-group">
                                <span className="input-group-text">Take</span>
                                <input type="number" step="1" className="form-control" id="intervalQty" />
                                <span className="input-group-text">doses every</span>
                                <input type="number" step="1" className="form-control" id="intervalVal" />
                                <span className="input-group-text">day</span>
                            </div>
                        </div>
                        <div className="col-4 d-flex align-items-end pb-2">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="isOptional" />
                                <label htmlFor="isOptional" className="form-check-label ms-1">As needed</label>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 mt-1">
                        <div className="row g-3 p-3 mb-3 border border-1 border-info rounded-3">
                            <h6 className="text-info mt-0">Cautions and Warnings</h6>
                            <div className="col-8">
                                <div className="row g-2">
                                    {/* Render warning checkboxes in a grid */}
                                    {checkboxList()}
                                </div>
                            </div>
                            <div className="col-4">
                                <label htmlFor="doseNotes" className="form-label">Special instructions or use notes</label>
                                <textarea className="form-control" rows="4" id="doseNotes" />
                            </div>
                        </div>
                    </div>
                    <h4 className="text-info">Medication Supply</h4>
                    <div className="row g-3 p-3 mb-3">
                        <div className="col-4">
                            <div className="input-group mb-3">
                                <input type="number" step="1" className="form-control" id="inStock" />
                                <span className="input-group-text">doses, or</span>
                                <input type="text" className="form-control" id="daysInStock" />
                                <span className="input-group-text">days supply</span>
                            </div>
                            <div className="input-group">
                                <select id="warnLimit" class="form-select">
                                    <option selected>5</option>
                                    <option value="1">10</option>
                                    <option value="2">30</option>
                                </select>
                                <span className="input-group-text">day refill warning</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="isAvtive" />
                        <label className="form-check-label" for="isActive">I am currently taking this medication</label>
                    </div>
                    <button type="submit" className="btn btn-info">Add drug</button>
                </form>
            </div>
        </>
    );

};

export default AddDrug;