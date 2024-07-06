import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDataThunk } from "../redux/actions/exampleActions";
import "./Index.css";

class IndexPage extends React.PureComponent {
  componentDidMount() {
    const { data } = this.props;

    if (data.length === 0) {
      return this.props.getDataIndexPage();
    }

    return null;
  }

  render() {
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
            {data.map((value, i) => {
              return (
                <tr key={i}>
                  <td>{value.name}</td>
                  <td>{value.lastName}</td>
                  <td>{value.accountType}</td>
                  <td>{value.balance}</td>
                  <td>{value.currencyType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.exampleReducer.data,
    loading: state.exampleReducer.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return { getDataIndexPage: bindActionCreators(getDataThunk, dispatch) };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexPage)
);
