import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="container bg-primary">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-drug">Add New Medication</NavLink>
        </nav>
    );
};

export default NavBar;