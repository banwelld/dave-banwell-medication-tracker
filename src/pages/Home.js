import React from "react";
import DrugMatrix from "../components/DrugMatrix";
import SearchFilter from "../components/SearchFilter";
import AddDrug from "../components/AddDrug";

function Home() {
    return (
        <>
            <SearchFilter />
            <AddDrug />
            <DrugMatrix />
        </>
    );
}

export default Home;