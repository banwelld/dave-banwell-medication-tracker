function CautionBox({ boxId, labelText }) {
    return (
        <div className="col-6 col-md-4">
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id={boxId} />
                <label htmlFor={boxId} className="form-check-label ms-1">{labelText}</label>
            </div>
        </div>
    );
}

export default CautionBox;