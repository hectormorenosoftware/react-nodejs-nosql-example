import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginRedux } from "../redux/actions/userActions";

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
        <div className="Hero" id="hero-height">
          <div className="HeroGroup" id="hero-group-height">
            <p>Loading please wait ...</p>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1 id="align-text">Management Login Portal</h1>
        <div className="flexbox-column">
          <input
            className="search-bar margin-create-employee-fields"
            id="width-login-fields"
            type="text"
            name="username"
            onChange={this.changeUserName}
            placeholder="Enter your username"
            value={userName}
          />
          <input
            className="search-bar margin-create-employee-fields"
            id="width-login-fields"
            type={displayPassword ? "text" : "password"}
            name="password"
            onChange={this.changePassword}
            placeholder="Enter your password"
            value={password}
          />
          <div className="flexbox-column">
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
