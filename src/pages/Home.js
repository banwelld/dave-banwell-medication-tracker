import React from "react";
import DrugMatrix from "../components/DrugMatrix";
import SearchFilter from "../components/SearchFilter";

function Home() {
    return (
        <>
            <SearchFilter />
            <DrugMatrix />
        </>
    );
}

export default Home;