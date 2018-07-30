import React, { Component } from "react";
import "./Landing.css";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
// import LogInBtn from "../../components/LogInBtn";
// import SignUpBtn from "../../components/SignUpBtn";
import Footer from "../../components/Footer";

class Landing extends Component {

  render() {
    return (
      <Container fluid>

        <Header />

        <Jumbotron />

        <Footer />

      </Container>
    );
  }
}

export default Landing;
