import React from "react";
import NavBar from "./NavBar";

function Header() {
    return (
        <>
            <div className="container text-center">
                <h1>My Medication Tracker</h1>
            </div>
            <NavBar />
        </>
    );
};

export default Header;