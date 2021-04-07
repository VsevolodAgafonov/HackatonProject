import Olympiads from "./components/olympiadsPage.jsx";
import Olympiad from "./components/olympiadPage.jsx";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Olympiads} />
          <Route exact path="/olympiad" component={Olympiad} />
        </Switch>
      </Router>
    );
  }
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
