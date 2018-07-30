import React, { Component } from "react";
import "./SignIn.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import SubmitBtn from "./components/SubmitBtn";
import Input from "../../components/Input";
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import 'whatwg-fetch';



class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInUser: '',
            signInPass: ''
        }

        this.HandleInputChangeSignInPass = this.HandleInputChangeSignInPass.bind(this);
        this.HandleInputChangeSignInUser = this.HandleInputChangeSignInUser.bind(this);
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

    onSignIn() {
      const {
        signInUser,
        signInPass
      } = this.state

      this.setState({
      isLoading: true,
      })

      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signInUser,
          password: signInPass
        })
      }).then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage('the_main-app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInUser: '',
              signInPass: '',
              token: json.token
            })
          }  else {
            this.setState({
              signInError: json.message,
              isLoading: false
            })
          }
        })
    }

    render() {
      const {
        isLoading,
        token,
        signInError,
        signInUser,
        signInPass,
        signUpUser,
        signUpError,
        signUpPass
      } = this.state;
        return (
            <div>

                {/* <Header /> */}
                <form className="signIn-form">
                    <h3 className="signin-heading"> Hello </h3>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={signInUser}
                        onChange={this.HandleInputChangeSignInUser}/>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={signInPass}
                        onChange={this.HandleInputChangeSignInPass}/>
                    <br />
                    <button onClick={this.onSignIn}>Sign In</button>
                </form>
                {/* <Footer /> */}
            </div>
        );
    }

}

export default SignIn;
