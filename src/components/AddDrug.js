import React, { useState, useEffect } from "react";

function AddDrug({ renderNewDrug }) {

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
           .then((data) => renderNewDrug(data))
           .catch((error) => console.log(error));
    }

    // form event handlers

    const handleInfoChange = (e) => {
        const { id, type, value, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        setNewDrug({ ...newDrug, [id]: inputValue });
        console.log(newDrug);
    };

    // useEffect to load warnings into state on component mount

    useEffect(() => getWarnings(), []);

    // minor components

    const CheckboxElement = ({ id, labelText }) => {
        return (
            <div className="form-check mt-0 mb-0">
                <input type="checkbox" className="form-check-input" id={id} checked={newDrug[id]} onChange={handleInfoChange} />
                <label className="form-check-label small" htmlFor={id}>{labelText}</label>
            </div>
        );
    };

    // function to create a list of warning checkboxes for the dropdown

    const warningList = () => {
        return warnings.map((warning) => (
            <CheckboxElement key={warning.id} id={warning.id} labelText={warning.labelText} />
        ));
    };

    return (
        <div className="border border-2 border-primary rounded-3 mb-3">
            <form className="p-3">
                <div className="row g-3">
                    <div className="col-2">
                        <label htmlFor="brandName" className="form-label">Brand Name</label>
                        <input type="text" className="form-control" id="brandName" onChange={handleInfoChange} />
                        <div id="brandNameHelp" className="form-text">E.g., Lipitor</div>
                    </div>
                    <div className="col-3">
                        <label htmlFor="genericName" className="form-label">Chemical Name</label>
                        <input type="text" className="form-control" id="genericName" onChange={handleInfoChange} />
                        <div id="genericNameHelp" className="form-text">E.g., Atorvastatin</div>
                    </div>
                    <div className="col">
                        <label htmlFor="doseVal" className="form-label">Strength</label>
                        <input type="number" step="1" className="form-control" id="doseVal" onChange={handleInfoChange} />
                    </div>
                    <div className="col-1">
                        <label htmlFor="doseUnits" className="form-label">Units</label>
                        <select id="doseUnits" className="form-select" defaultValue="1" onChange={handleInfoChange}>
                            <option value="1">mg</option>
                            <option value="2">ug</option>
                            <option value="3">ml</option>
                            <option value="4">IU</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="dailyQty" className="form-label">Daily Doses</label>
                        <input type="number" step="1" className="form-control" id="dailyQty" onChange={handleInfoChange} />
                    </div>
                    <div className="col">
                        Special Instructions
                        <div className="btn-group mt-1">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="warningDropdown"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                            >
                                &nbsp;&nbsp;&nbsp;Select All Applicable&nbsp;&nbsp;&nbsp;
                            </button>
                            <div className="dropdown-menu p-2" style={{width: "20rem"}}>
                                {warningList()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mt-3">
                    <div className="col">
                        <label htmlFor="dailyQty" className="form-label">Qty in Stock</label>
                        <input type="number" step="1" className="form-control" id="inStock" onChange={handleInfoChange} />
                    </div>
                    <div className="col-10">
                        <label className="form-label" htmlFor="imgUrl">Link to Medication Image</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            placeholder="E.g., http://www.image.com/image.jpg"
                            onChange={handleInfoChange}
                        />
                    </div>
                </div>
                <div className="row g-3 mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary" onClick={addNewDrug}>Add Medication</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddDrug;