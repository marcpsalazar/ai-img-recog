import React, { Component } from "react";
import "./Profile.css";
import Container from "../../components/Container";
import Header from "../../components/Header";
import TestImageSubmit from "../TestImageSubmit";
import ProfilePhotos from "../../components/ProfilePhotos";
import Footer from "../../components/Footer";
import LogOutBtn from "../../components/LogOutBtn";
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import 'whatwg-fetch';

class Profile extends Component {
  constructor(props) {
    super(props);

this.state = {
  isLoading: true,
  token: '',
  signUpError: '',
  signInError: '',
  signInUser: '',
  signInPass: '',
  signUpUser: '',
  signUpPass: ''
};


this.logout = this.logout.bind(this);
}

componentDidMount() {
  const obj = getFromStorage('the_main_app');
  console.log(obj);

  if (obj && obj.token) {
  const { token } = obj;

  fetch('/api/account/verify?token=' + token)
  .then(res => res.json())
  .then(json => {
    if (json.success) {
      this.setState({
        token,
        isLoading: false
      })
    } else {
      this.setState({
        isLoading: false
      })
    }
  })

  }else {
  this.setState({
    isLoading: false
  })
  }
}


  logout() {
    this.setState({
      isLoading: true,
    });

    console.log("button clicked");
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token) {
      const { token } = obj;

      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token: '',
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      })

    }else {
      this.setState({
        isLoading: false
      })
    }
  }


  render() {
    const {
      isLoading,
      token,
    } = this.state;

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
