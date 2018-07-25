import React from "react";
import { Link } from "react-router-dom";
import "./LogOutBtn.css";

const LogOutBtn = props => (

    <Link to="/">
        <button type="button" className="btn btn-success">
            Log Out
        </button>
    </Link>
);

export default LogOutBtn;
