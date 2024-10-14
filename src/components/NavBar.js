import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <div className="container">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/add-drug">Add New Medication</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;