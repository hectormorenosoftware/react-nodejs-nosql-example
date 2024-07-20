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
    this.state = {
      name: "",
      lastName: "",
      personalEmail: "",
      companyEmail: "",
      companyNumber: "",
      phoneNumber: "",
      slackID: "",
      salary: "",
      companyRole: "",
    };
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
    const {
      name,
      lastName,
      personalEmail,
      companyEmail,
      companyNumber,
      phoneNumber,
      slackID,
      salary,
      companyRole,
    } = this.state;

    createEmployeeFuncProp(
      name,
      lastName,
      name + lastName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole
    );
    this.setState({
      name: "",
      lastName: "",
      personalEmail: "",
      companyEmail: "",
      companyNumber: "",
      phoneNumber: "",
      slackID: "",
      salary: "",
      companyRole: "",
    });
  };

  render() {
    const {
      name,
      lastName,
      personalEmail,
      companyEmail,
      companyNumber,
      phoneNumber,
      slackID,
      salary,
      companyRole,
    } = this.state;

    const { loading, createEmployeeMessage } = this.props;

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
      <div className="flexbox-column">
        <h1 id="align-text">Create Employee</h1>
        <h3 id="align-text">
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
          name="personalEmail"
          placeholder="Enter personal email"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={personalEmail}
        />
        <input
          type="email"
          name="companyEmail"
          placeholder="Enter company email"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={companyEmail}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter personal phone number"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={phoneNumber}
        />
        <input
          type="text"
          name="companyNumber"
          placeholder="Enter company phone number"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={companyNumber}
        />
        <input
          type="text"
          name="slackID"
          placeholder="Enter slackID"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={slackID}
        />
        <input
          type="text"
          name="companyRole"
          placeholder="Enter company role"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={companyRole}
        />
        <input
          type="text"
          name="salary"
          placeholder="Enter salary"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={salary}
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
