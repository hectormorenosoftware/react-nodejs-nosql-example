import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createEmployeeRedux,
  resetMessageRedux,
} from "../redux/actions/userActions";

class CreateEmployeePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { name: "", lastName: "", email: "", phoneNumber: "" };
  }

  setValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  goBackToEmployeesPage = () => {
    const { history, resetMessageFuncProp } = this.props;
    history.push("/employees");
    resetMessageFuncProp();
  };

  createEmployee = () => {
    const { createEmployeeFuncProp } = this.props;
    const { name, lastName, email, phoneNumber } = this.state;
    createEmployeeFuncProp(name, lastName, name + lastName, email, phoneNumber);
    this.setState({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
  };

  render() {
    const { name, lastName, email, phoneNumber } = this.state;
    const { loading, createEmployeeMessage } = this.props;

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create Employee</h1>
        <h3 style={{ textAlign: "center" }}>
          {createEmployeeMessage.length > 0 ? createEmployeeMessage : ""}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={name}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter last name"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={lastName}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={email}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter phone number"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={phoneNumber}
        />
        <button
          className="client-button margin-create-employee-fields"
          type="button"
          onClick={this.createEmployee}
        >
          Create Employee
        </button>
        <button
          className="client-button margin-create-employee-fields"
          type="button"
          onClick={this.goBackToEmployeesPage}
        >
          Go Back
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userReducer.loading,
    createEmployeeMessage: state.userReducer.createEmployeeMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEmployeeFuncProp: bindActionCreators(createEmployeeRedux, dispatch),
    resetMessageFuncProp: bindActionCreators(resetMessageRedux, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEmployeePage)
);
