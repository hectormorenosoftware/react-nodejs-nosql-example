import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsersDataRedux,
  updateTaskAndProgressRedux,
} from "../../redux/actions/userActions";

const selectOptions = [
  { name: "Not Started" },
  { name: "In Progress" },
  { name: "Verifying" },
  { name: "Done" },
];
class EditNotes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      progress: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.userDetails !== undefined &&
      state.notes.length === 0 &&
      state.progress.length === 0
    ) {
      return {
        notes: props.userDetails.notes,
        progress: props.userDetails.progress,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { history, loginSuccess } = this.props;

    if (loginSuccess === false) {
      return history.push("/");
    }

    return null;
  }

  setNotes = (e) => {
    const { value } = e.target;
    this.setState((state, props) => {
      return { notes: value };
    });
  };

  selectOption = (e) => {
    const { value } = e.target;

    this.setState({
      progress: value,
    });
  };

  goBack = () => {
    const { history, getTableData } = this.props;
    history.push("/employees");
    getTableData();
  };

  submitDetails = () => {
    const { updateTaskAndProgressFuncProp, userDetails, history } = this.props;
    const { notes, progress } = this.state;
    const {
      name,
      lastName,
      userName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
    } = userDetails;

    updateTaskAndProgressFuncProp(
      name,
      lastName,
      userName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
      notes,
      progress
    );

    history.push("/employees");
  };

  render() {
    const { changedColorProp, userDetails } = this.props;
    const { notes, progress } = this.state;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Edit Employee Notes</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Name: {userDetails === undefined ? null : userDetails.name}{" "}
            {userDetails === undefined ? null : userDetails.lastName}
          </h3>
        </div>
        <button
          type="button"
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          onClick={this.goBack}
        >
          Go Back
        </button>
        <select
          onChange={this.selectOption}
          style={{
            cursor: "pointer",
            width: "20rem",
            height: "2rem",
            margin: "10px",
          }}
          value={progress}
        >
          <option>Please choose a status</option>
          {selectOptions.map((value, i) => (
            <option key={i}>{value.name}</option>
          ))}
        </select>
        <textarea
          name="notes"
          rows="30"
          cols="30"
          style={{ width: "80%", height: "10rem" }}
          placeholder="Add your notes about your employees tasks this sprint here."
          onChange={this.setNotes}
          value={notes}
        ></textarea>
        <button
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          style={{ marginTop: "1rem" }}
          type="button"
          onClick={this.submitDetails}
        >
          Submit
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginSuccess: state.userReducer.loginSuccess,
    userDetails: state.userReducer.data[0],
    changedColorProp: state.userReducer.changedColor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTableData: bindActionCreators(getUsersDataRedux, dispatch),
    updateTaskAndProgressFuncProp: bindActionCreators(
      updateTaskAndProgressRedux,
      dispatch
    ),
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditNotes)
);
