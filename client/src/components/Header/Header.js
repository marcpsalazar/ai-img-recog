import React, { Component } from "react";
import "./Header.css";
import magnifiedleaf from "../../images/magnified-leaf.png";

class Header extends Component {
    render() {
        return (
            <div className="logo">
                <img src={magnifiedleaf} alt="Leaf under magnifying glass"/>
                <h1>Leafy</h1>
            </div>
        );
    }
}
export default Header;