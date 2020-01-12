import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/login";
import "./index.less";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Router>
    );
  }
}
