import React from "react";
import DrugMatrix from "../components/DrugMatrix";
import SearchFilter from "../components/SearchFilter";

function Home() {
    return (
        <body>
            <SearchFilter />
            <DrugMatrix />
        </body>
    );
}

export default Home;