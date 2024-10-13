import React from "react";
import DrugMatrix from "../components/DrugMatrix";
import SearchFilter from "../components/SearchFilter";

function Home() {
    return (
        <div>
            <SearchFilter />
            <DrugMatrix />
        </div>
    );
}

export default Home;