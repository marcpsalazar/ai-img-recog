import React, { Component } from "react";
import { Redirect } from "react-router";
import { setInStorage } from '../../utils/storage';
import Input from "../../components/Input";
import API from "../../utils/API";
import "./SignIn.css";

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
    });
  }

  HandleInputChangeSignInPass(event) {
    this.setState({
      signInPass: event.target.value
    });
  }

  onSignIn(e) {
    e.preventDefault()
    const {
      signInUser,
      signInPass
    } = this.state

    let siObj = {
      username: signInUser,
      password: signInPass
    }

    API.signIn(siObj)
      .then(json => {
        console.log(json)
          if (json.statusText==="OK") {
            console.log('storage method reached');
            console.log(json.data.token);
            console.log(json.data);
            setInStorage('the_main-app', { token: json.data.token });
            this.setState({
              signInError: json.data.message,
              isLoading: false,
              signInUser: '',
              signInPass: '',
              token: json.data.token
            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false
            })
          }
          this.setState({fireRedirect: true});
      });
  }

  render() {
    const {
      signInUser,
      signInPass,
      fireRedirect
    } = this.state;
      return (
        <div>
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
            {fireRedirect && (
              <Redirect to={'/profile'}/>
            )}
        </div>
      );
  }
}

export default SignIn;
