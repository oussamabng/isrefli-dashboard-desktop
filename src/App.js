import React from 'react';

import {  HashRouter as Router, Route,Redirect } from "react-router-dom";


import Login from "./views/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={()=><div>test</div>} />
        <Redirect to="/login" />
      </Router>
    </div>
  );
}

export default App;
