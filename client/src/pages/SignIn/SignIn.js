import React, { Component } from "react";
import "./SignIn.css";
import Input from "../../components/Input";
import { getFromStorage, setInStorage, } from '../../utils/storage';
import API from "../../utils/API";
import Profile from "../Profile";
import { Route, Redirect } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";




class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      signInUser: '',
      signInPass: '',
      fireRedirect: false
    }

    this.HandleInputChangeSignInPass = this.HandleInputChangeSignInPass.bind(this);
    this.HandleInputChangeSignInUser = this.HandleInputChangeSignInUser.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }
  HandleInputChangeSignInUser(event) {
    this.setState({
      signInUser: event.target.value

    })
  }

  HandleInputChangeSignInPass(event) {
    this.setState({
      signInPass: event.target.value

    })
  }

  onSignIn(e) {
    e.preventDefault()
    const { signInUser, signInPass } = this.state

    let siObj = {
      username: signInUser,
      password: signInPass
    }

    API.signIn(siObj)

      .then(json => {
        console.log(json)
        if (json.statusText === "OK") {
          console.log('storage method reached')
          console.log(json.data.token)
          setInStorage('the_main-app', { token: json.data.token });
          this.setState({
            signInError: json.data.message,
            isLoading: false,
            signInUser: '',
            signInPass: '',
            token: json.data.token
          })
          // console.log(this.state.token)
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          })
        }
        this.setState({ fireRedirect: true });

      })

  }

  render() {
    const {
      token,
      signInError,
      signInUser,
      signInPass,
      fireRedirect
    } = this.state;
    return (
      <Container fluid>
        <div className="background-image">
          <Header />
          <form className="signIn-form">
            <h2 className="signin-heading"> Hello </h2>
            <Input
              type="text"
              placeholder="Username"
              value={signInUser}
              onChange={this.HandleInputChangeSignInUser} />
            <Input
              type="password"
              placeholder="Password"
              value={signInPass}
              onChange={this.HandleInputChangeSignInPass} />
            <br />
            <button id="signin" onClick={this.onSignIn}>Sign In</button>
          </form>
          {fireRedirect && (
            <Redirect to={'/profile'} />
          )}
          <Footer />
        </div>
      </Container>
    );
  }

}

export default SignIn;
