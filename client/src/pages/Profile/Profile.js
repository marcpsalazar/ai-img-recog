import React, { Component } from "react";
import "./Profile.css";
import Container from "../../components/Container";
import Header from "../../components/Header";
import TestImageSubmit from "../TestImageSubmit";
import ProfilePhotos from "../../components/ProfilePhotos";
import Footer from "../../components/Footer";
import LogOutBtn from "../../components/LogOutBtn";

class Profile extends Component {

  render() {
    return (
      <Container fluid>

        <Header />

        <TestImageSubmit />

        <ProfilePhotos />

        <LogOutBtn />

        <Footer />

      </Container>    
    );
  }
}

export default Profile;