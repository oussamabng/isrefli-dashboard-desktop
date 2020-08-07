import React from 'react';

import {  HashRouter as Router, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={()=><div>home</div>} />
        <Route exact path="/test" component={()=><div>test</div>} />
      </Router>
    </div>
  );
}

export default App;
