import React from 'react';
import "./index.css"
import {  HashRouter as Router, Route,Redirect } from "react-router-dom";


import Login from "./views/Login/Login";
import Product from "./views/Product/Product";
import Dashboard from "./views/Dashboard/Dashboard";
import Add from "./views/Product/Add";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/add/product" component={Add} />

        <Redirect to="/login" />
      </Router>
    </div>
  );
}

export default App;
