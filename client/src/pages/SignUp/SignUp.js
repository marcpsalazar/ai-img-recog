import React, { Component } from "react";
import "./SignUp.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import SubmitBtn from "./components/SubmitBtn";
import Input from "../../components/Input";
import 'whatwg-fetch';



class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            signUpUser: '',
            signUpPass: ''
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

      onSignUp() {
        const {
          signUpUser,
          signUpPass
        } = this.state

        this.setState({
          isLoading: true
        })

        fetch('/api/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: signUpUser,
            password: signUpPass
          })
        }).then(res => res.json())
        .then(json => {
          if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpUser: '',
            signUpPass: ''
          })
        } else {
            this.setState({
              signUpError: json.message,
              isLoading: false
            })
          }
        })
      }

    render() {
      const {
        isLoading,
        token,
        signUpUser,
        signUpError,
        signUpPass
      } = this.state;
        return (
            <div>

                {/* <Header /> */}
                <form className="signUp-form">
                    <h3 className="signup-heading"> Create a Profile </h3>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={signUpUser}
                        onChange={this.HandleInputChangeSignUpUser}/>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={signUpPass}
                        onChange={this.HandleInputChangeSignUpPass}/>
                    <br />
                    <button onClick={this.onSignUp}>Sign Up</button>
                </form>
                {/* <Footer /> */}
            </div>
        );
    }

}

export default SignUp;
