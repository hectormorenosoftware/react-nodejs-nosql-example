import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";

import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/accounts" render={() => <IndexPage />} />
        <Route exact path="/" render={() => <LoginPage />} />
      </Switch>
    );
  }
}

export default withRouter(App);
