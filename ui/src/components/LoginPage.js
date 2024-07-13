import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginRedux } from "../redux/actions/userActions";

import "./Login.css";

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      displayPassword: false,
    };
  }

  componentDidUpdate() {
    const { loginSuccess, history } = this.props;
    if (loginSuccess === true) {
      history.push("/employees");
    }
  }

  changeUserName = (e) => {
    const { value } = e.target;
    this.setState({
      userName: value,
    });
  };

  changePassword = (e) => {
    const { value } = e.target;
    this.setState({
      password: value,
    });
  };

  showPassword = () => {
    const { displayPassword } = this.state;
    this.setState({
      displayPassword: !displayPassword,
    });
  };

  loginFunc = () => {
    const { userName, password } = this.state;

    if (userName.length === 0) {
      return null;
    }

    if (password.length === 0) {
      return null;
    }

    if (userName.length > 0 && password.length > 0) {
      return this.props.loginToAccounts(userName, password);
    }
  };

  render() {
    const { userName, password, displayPassword } = this.state;
    const { loading } = this.props;

    if (loading === true) {
      return (
        <div className="Hero" style={{ height: "100vh", overflow: "hidden" }}>
          <div
            className="HeroGroup"
            style={{ height: "78vh", background: "none" }}
          >
            <p>Loading please wait ...</p>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>
          American Express Manager Login Portal
        </h1>
        <div className="login-inputs-flex-box">
          <input
            className="search-bar margin-create-employee-fields"
            type="text"
            name="username"
            onChange={this.changeUserName}
            style={{ width: "35%" }}
            placeholder="Enter your username"
            value={userName}
          />
          <input
            className="search-bar margin-create-employee-fields"
            type={displayPassword ? "text" : "password"}
            name="password"
            onChange={this.changePassword}
            style={{ width: "35%" }}
            placeholder="Enter your password"
            value={password}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              className="client-button margin-create-employee-fields"
              type="button"
              onClick={this.showPassword}
            >
              Display Password
            </button>
            <button
              className="client-button margin-create-employee-fields"
              type="button"
              onClick={this.loginFunc}
            >
              Login
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userReducer.loading,
    loginSuccess: state.userReducer.loginSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginToAccounts: bindActionCreators(loginRedux, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
