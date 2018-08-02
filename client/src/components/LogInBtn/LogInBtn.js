import React from "react";
import { Link } from "react-router-dom";
import "./LogInBtn.css";

const LogInBtn = props => (

    <Link to="/signin"><button class="submit-button" type="button" className="btn btn-success">
        Sign In
    </button></Link>
);

export default LogInBtn;
