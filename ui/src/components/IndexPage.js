import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsersDataRedux,
  getUserDataRedux,
} from "../redux/actions/userActions";
import "./Index.css";

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "" };
  }
  componentDidMount() {
    const { data } = this.props;

    if (data.length === 0) {
      return this.props.getDataIndexPage();
    }

    return null;
  }

  setFirstName = (e) => {
    const { value } = e.target;
    this.setState({
      firstName: value,
    });
  };

  setLastName = (e) => {
    const { value } = e.target;
    this.setState({
      lastName: value,
    });
  };

  searchForUserByUserName = () => {
    const { firstName, lastName } = this.state;
    if (firstName.length === 0) {
      return null;
    }
    if (lastName.length === 0) {
      return null;
    }

    if (firstName.length > 0 && lastName.length > 0) {
      this.props.getIndividualUserDataIndexPage(firstName.concat(lastName));
    }
  };

  render() {
    const { firstName, lastName } = this.state;
    const { loading, data } = this.props;

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
      <div className="table-style">
        <h1 className="heading-subject">American Express Investing Accounts</h1>
        <div className="flex-box-searchbar-searchbutton">
          <input
            className="search-bar"
            placeholder="Enter first name"
            onChange={this.setFirstName}
            value={firstName}
          />
          <input
            className="search-bar"
            placeholder="Enter Last name"
            onChange={this.setLastName}
            value={lastName}
          />
          <button
            className="search-client-button"
            type="button"
            onClick={this.searchForUserByUserName}
          >
            Search
          </button>
        </div>

        <table className="table-data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Currency Type</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0
              ? data.map((value, i) => {
                  return (
                    <tr key={i}>
                      <td>{value.name}</td>
                      <td>{value.lastName}</td>
                      <td>{value.accountType}</td>
                      <td>{value.balance}</td>
                      <td>{value.currencyType}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.userReducer.data,
    userData: state.userReducer.userData,
    loading: state.userReducer.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataIndexPage: bindActionCreators(getUsersDataRedux, dispatch),
    getIndividualUserDataIndexPage: bindActionCreators(
      getUserDataRedux,
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexPage)
);
