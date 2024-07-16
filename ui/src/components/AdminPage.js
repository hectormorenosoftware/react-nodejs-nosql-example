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
      <div>
        <h1 style={{ textAlign: "center" }}>Create Admin</h1>
        <h3 style={{ textAlign: "center" }}>
          Remember the username will be the first and last name of the person
          without spaces for example: JohnRafford
        </h3>
        <h3 style={{ textAlign: "center" }}>
          {createAdminMessage.length > 0 ? createAdminMessage : ""}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            {name.length > 0 && lastName.length > 0
              ? `Username: ${name + lastName}`
              : null}{" "}
          </p>
          <input
            type="text"
            name="name"
            className="search-bar"
            placeholder="Enter a name"
            style={{ marginBottom: "10px", width: "300px" }}
            onChange={this.onChangeSetValue}
            value={name}
          />
          <input
            type="text"
            name="lastName"
            className="search-bar"
            placeholder="Enter a last name"
            style={{ marginBottom: "10px", width: "300px" }}
            onChange={this.onChangeSetValue}
            value={lastName}
          />
          <input
            type="text"
            name="password"
            className="search-bar"
            placeholder="Enter a password"
            style={{ marginBottom: "10px", width: "300px" }}
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
