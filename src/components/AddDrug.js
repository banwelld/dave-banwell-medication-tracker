import React, { useState, useEffect } from "react";

function AddDrug() {

    // state variables for form inputs

    const [warnings, setWarnings] = useState([]);
    const [newDrug, setNewDrug] = useState([]);

    // function to fetch warnings from API

    const getWarnings = () => {
        fetch("http://localhost:6001/warnings")
            .then((response) => response.json())
            .then((data) => setWarnings(data))
            .catch((error) => console.log(error));
    };

    // function to send new drug to server

    const addNewDrug = () => {
        fetch("http://localhost:6001/medications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDrug),
        })
           .then((response) => response.json())
           .then((data) => console.log(data))
           .catch((error) => console.log(error));
    }

    // form event handlers

    const handleInfoChange = (e) => {
        setNewDrug({ ...newDrug, [e.target.id]: e.target.value });
        console.log(newDrug);
    };

    // useEffect to load warnings into state on component mount

    useEffect(() => getWarnings(), []);

    // option component for warning dropdown

    const OptionElement = ({ id, labelText }) => <option value={id}>{labelText}</option>

    // function to create a list of warning checkboxes for the form

    const warningList = () => {
        return warnings.map((warning) => (
            <OptionElement key={warning.id} id={warning.id} labelText={warning.labelText} />
        ));
    };

    return (
        <>
            <h4 className="mt-2">Add New Medication</h4>
            <div className="border border-2 border-info rounded-3 mb-3">
                <form className="p-3">
                    <div className="row">
                        <div className="col">
                            <h5 className="text-info">Drug info</h5>
                            <div className="col">
                                <div className="row g-3">
                                    <div className="col-2">
                                        <label htmlFor="brandName" className="form-label">Brand Name</label>
                                        <input type="text" className="form-control" id="brandName" onChange={handleInfoChange} />
                                        <div id="brandNameHelp" className="form-text">E.g., Lipitor, Prilosec</div>
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="genericName" className="form-label">Generic/Chemical Name</label>
                                        <input type="text" className="form-control" id="genericName" onChange={handleInfoChange} />
                                        <div id="genericNameHelp" className="form-text">E.g., Atorvastatin, Omeprazole</div>
                                    </div>
                                    <div className="col-2">
                                        <label htmlFor="doseVal" className="form-label">Strength</label>
                                        <input type="number" step="1" className="form-control" id="doseVal" onChange={handleInfoChange} />
                                    </div>
                                    <div className="col-1">
                                        <label htmlFor="doseUnits" className="form-label">Units</label>
                                        <select id="doseUnits" className="form-select" onChange={handleInfoChange}>
                                            <option selected>mg</option>
                                            <option value="1">ug</option>
                                            <option value="2">ml</option>
                                            <option value="3">IU</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <h5 className="text-info">Instructions</h5>
                            <div className="row g-3 p-3">
                                <div className="col">
                                    <div className="input-group">
                                        <input type="number" step="1" className="form-control" id="intervalQty" onChange={handleInfoChange} />
                                        <span className="input-group-text">doses every</span>
                                        <input type="number" step="1" className="form-control" id="intervalVal" onChange={handleInfoChange} />
                                        <span className="input-group-text">day </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-5">
                            
                        </div>
                        <div className="col-4">
                            <h5 className="text-info">Cautions</h5>
                            <div className="row g-3 p-3">
                                <div className="col">
                                    <select id="warnings" className="form-select" defaultValue={[]} onChange={handleInfoChange} multiple size="3">
                                        {/* warning list from the API */}
                                        {warningList()}
                                    </select>
                                    <div id="brandNameHelp" className="form-text">Hold <kbd>Ctrl</kbd> down to click on more than one</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h5 className="text-info">Supply On-hand</h5>
                            <div className="row g-3 p-3 mb-3">
                                <div className="col-9">
                                    <div className="input-group mb-3">
                                        <input type="number" step="1" className="form-control" id="inStock" onChange={handleInfoChange} />
                                        <span className="input-group-text">doses</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info shadow">Add drug</button>
                </form>
            </div>
        </>
    );

};

export default AddDrug;