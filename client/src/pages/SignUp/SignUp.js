import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import "./SignUp.css";
import Profile from "../Profile";
import Input from "../../components/Input";
import API from "../../utils/API";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      signUpUser: '',
      signUpPass: '',
      fireRedirect: false
    }

    this.HandleInputChangeSignUpUser = this.HandleInputChangeSignUpUser.bind(this);
    this.HandleInputChangeSignUpPass = this.HandleInputChangeSignUpPass.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  HandleInputChangeSignUpUser(event) {
    this.setState({
      signUpUser: event.target.value

    })
  }

  HandleInputChangeSignUpPass(event) {
    this.setState({
      signUpPass: event.target.value

    })
  }

  onSignUp(e) {
    e.preventDefault()
    this.setState({ fireRedirect: true });
    const {
      signUpUser,
      signUpPass
    } = this.state
    console.log(signUpUser + signUpPass);
    let suObj = {
      username: signUpUser,
      password: signUpPass
    }
    API.signUp(suObj);
  }



  render() {
    const {
      signUpUser,
      signUpPass,
      fireRedirect
    } = this.state;
    const { from } = this.props.location.state || '/'

    return (
      <Container fluid>
        <div className="background-image">
          <Header />
          <form className="signUp-form">
            <h3 className="signup-heading"> Create a Profile </h3>
            <Input
              type="text"
              placeholder="Username"
              value={signUpUser}
              onChange={this.HandleInputChangeSignUpUser} />
            <Input
              type="password"
              placeholder="Password"
              value={signUpPass}
              onChange={this.HandleInputChangeSignUpPass} />
            <br />
            <button type="button" className="btn btn-sucess" id="signup" onClick={this.onSignUp}>Sign Up</button>
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



export default SignUp;
