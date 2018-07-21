import React from "react";
import TestImageSubmit from "./pages/TestImageSubmit";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={TestImageSubmit} />
      </Switch> 
    </div>
  </Router>
);

export default App;
