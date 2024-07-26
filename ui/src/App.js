import React from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";

import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import CreateEmployeePage from "./components/CreateEmployeePage";

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/create-employee"
          render={() => <CreateEmployeePage />}
        />

        <Route exact path="/create-admin" render={() => <AdminPage />} />
        <Route exact path="/employees" render={() => <IndexPage />} />
        <Route exact path="/" render={() => <LoginPage />} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(App);
