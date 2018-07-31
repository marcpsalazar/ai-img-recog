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
import API from "../../utils/API";
import {Route, Redirect} from "react-router";
import SignIn from "../SignIn";


class Profile extends Component {
  constructor(props) {
    super(props);

this.state = {
  isLoading: true,
  token: ''
};


this.logout = this.logout.bind(this);
}

componentDidMount() {
  const obj = getFromStorage('the_main-app');
  console.log(obj)
  if (obj && obj.token) {
    const { token } = obj;

    API.verify(token);

    this.setState ({
        token,
        isLoading: false,
        fireRedirect: false
      })
  }
}



  logout(e) {
    e.preventDefault()
    this.setState({
      isLoading: true,
    });

    console.log("button clicked");
    const obj = getFromStorage('the_main-app');

    if (obj && obj.token) {
      const { token } = obj;

      API.logout(token)
      .then(json => {
        if (json.statusText==="OK") {
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
    this.setState({fireRedirect: true});
  }


  render() {
    const {
      isLoading,
      token,
      fireRedirect
    } = this.state;

    return (
      <Container fluid>

        <Header />

        <TestImageSubmit />

        <ProfilePhotos />

        <button id="logout" type="button" className="btn btn-success"
        onClick={this.logout}>
            Log Out
        </button>

        <Footer />

      {fireRedirect && (
        <Redirect to={'/signin'}/>
        )}

      </Container>
    );
  }
}

export default Profile;
