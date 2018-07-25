import React from "react";
// import TestImageSubmit from "./pages/TestImageSubmit";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from "./pages/Landing";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Landing } />
      </Switch> 
    </div>
  </Router>
);

export default App;
