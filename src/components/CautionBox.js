function CautionBox({ boxId, labelText}) {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id={boxId} />
            <label htmlFor={boxId} className="form-check-label ms-1">{labelText}</label>
        </div>
    );
};

export default CautionBox;