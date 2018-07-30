import React from "react";
import { Link } from "react-router-dom";
import "./LogInBtn.css";

const LogInBtn = props => (

    <Link to="/signin"><button type="button" className="btn btn-success">
        Log In
    </button></Link>
);

export default LogInBtn;
