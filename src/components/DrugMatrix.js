import React from "react";
import { useState, useEffect } from "react";
import DrugCard from "./DrugCard";

// component function to export

function DrugMatrix() {

    // set state to hold the data for all the drugs in the list

    const [allDrugData, setAllDrugData] = useState([]);

    // function to retrieve data from api and set into state
    
    const getAllDrugData = () => {
        fetch("http://localhost:6001/medications")
        .then((response) => response.json())
        .then((data) => setAllDrugData(data))
        .catch((error => console.log(error)));
    };

    // use effect to fetch the drug data from the api on component mount

    useEffect(() => getAllDrugData(), []);

    // function that maps through the drug data and returns drug card array

    const drugCardList = (drugData) => {
        return drugData.map((drug) => (
            <DrugCard key={drug.id} drug={drug} />
        ));
    };

    return (
        <div>
            {drugCardList(allDrugData)}
        </div>
    );
};

export default DrugMatrix;