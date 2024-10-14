import React from "react";

function AddDrug() {

    return (
        <>
            <h2 className="mt-2">Add New Medication</h2>
            <div className="border border-2 border-info">
                <form className="p-3">
                    <div className="row g-3">
                        <div className="col">
                            <label for="brandName" className="form-label">Brand Name</label>
                            <input type="text" className="form-control" id="brandName" />
                            <div id="brandNameHelp" className="form-text">E.g., Lipitor, Zithromax, Prilosec</div>
                        </div>
                        <div className="col">
                            <label for="genericName" className="form-label">Generic/Chemical Name</label>
                            <input type="text" className="form-control" id="genericName" />
                            <div id="genericNameHelp" className="form-text">E.g., Atorvastatin, Azithromycin, Omeprazole</div>
                        </div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );

};

export default AddDrug;