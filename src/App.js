import "./assets/style/common.css";
import "./assets/style/slick.css";
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import Account from "./components/account/Account";
import Strategy from "./components/strategy/Strategy";


function App() {

  return (
    <>      
        <Switch>
          <Route exact path="/" component={Home} />      
          <Route path="/account" component={Account} />        
          <Route path="/strategy" component={Strategy} />
        </Switch>
    </>
  );
}

export default App;
