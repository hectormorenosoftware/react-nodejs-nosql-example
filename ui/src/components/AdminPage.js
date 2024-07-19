import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createAdminRedux,
  resetMessageRedux,
} from "../redux/actions/userActions";

class AdminPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      userName: "",
      password: "",
      admin: "true",
    };
  }

  onChangeSetValue = (e) => {
    const { resetMessagePropFunc } = this.props;
    const { value, name } = e.target;

    resetMessagePropFunc();

    this.setState({
      [name]: value,
    });
  };

  goBackToEmployees = () => {
    const { history, resetMessagePropFunc } = this.props;
    resetMessagePropFunc();
    history.push("/employees");
  };

  createAdminFunc = () => {
    const { name, lastName, password } = this.state;
    const { createAdminPropFunc, resetMessagePropFunc } = this.props;
    resetMessagePropFunc();
    createAdminPropFunc(name, lastName, name + lastName, password, "true");
    this.setState({
      name: "",
      lastName: "",
      userName: "",
      password: "",
      admin: "true",
    });
  };

  render() {
    const { name, lastName, password } = this.state;
    const { loading, createAdminMessage } = this.props;

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
      <div>
        <h1 id="align-text">Create Admin</h1>
        <h3 id="align-text">
          Remember the username will be the first and last name of the person
          without spaces for example: JohnRafford
        </h3>
        <h3 id="align-text">
          {createAdminMessage.length > 0 ? createAdminMessage : ""}
        </h3>
        <div className="flexbox-column">
          <p id="align-text">
            {name.length > 0 && lastName.length > 0
              ? `Username: ${name + lastName}`
              : null}{" "}
          </p>
          <input
            type="text"
            name="name"
            id="admin-page-adjustment"
            className="search-bar"
            placeholder="Enter a name"
            onChange={this.onChangeSetValue}
            value={name}
          />
          <input
            type="text"
            name="lastName"
            id="admin-page-adjustment"
            className="search-bar"
            placeholder="Enter a last name"
            onChange={this.onChangeSetValue}
            value={lastName}
          />
          <input
            type="text"
            name="password"
            id="admin-page-adjustment"
            className="search-bar"
            placeholder="Enter a password"
            onChange={this.onChangeSetValue}
            value={password}
          />
          <button
            type="button"
            className="client-button"
            onClick={this.createAdminFunc}
          >
            Create Admin
          </button>
          <button
            type="button"
            className="client-button"
            onClick={this.goBackToEmployees}
            style={{ marginTop: "5px" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userReducer.loading,
    createAdminMessage: state.userReducer.createAdminMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createAdminPropFunc: bindActionCreators(createAdminRedux, dispatch),
    resetMessagePropFunc: bindActionCreators(resetMessageRedux, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);
