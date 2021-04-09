import Olympiads from "./components/olympiadsPage.jsx";
import AdminOlympiads from "./components/adminOlympiadsPage.jsx";
import Olympiad from "./components/olympiadPage.jsx";
import AddOlympiad from "./components/addOlympiadPage.jsx";
import EditOlympiad from "./components/editOlympiadPage.jsx";
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
          <Route exact path="/admin" component={AdminOlympiads} />
          <Route exact path="/olympiad" component={Olympiad} />
          <Route exact path="/add" component={AddOlympiad} />
          <Route exact path="/edit" component={EditOlympiad} />
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
