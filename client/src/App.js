import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from "./pages/Landing";


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
        
      
    </div>
  </Router>
);

export default App;
