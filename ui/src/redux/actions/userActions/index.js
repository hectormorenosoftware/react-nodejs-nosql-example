import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE,
  RESET_MESSAGE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  RESET_ALL_DATA,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SEARCH_BY_NAME_REQUEST,
  SEARCH_BY_NAME_SUCCESS,
  SEARCH_BY_NAME_FAILURE,
} from "../../types";
import {
  getUsersTableData,
  getUserTableData,
  login,
  createAdminFunc,
  createEmployeeFunc,
  deleteEmployeeFunc,
  searchUserByNameFunc,
} from "../../api/api";

export function getUsersDataRedux() {
  return async function (dispatch) {
    dispatch({ type: GET_DATA });

    try {
      //this is where an axios get, post, delete, or put request will go for example axios.get("https://fetchdata.com");
      //this is where a fetch get, post, delete, put request will go for example fetch("https://fetchdata.com");

      const data = await getUsersTableData();

      return dispatch({ type: GET_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
      throw new Error(error);
    }
  };
}

export function getUserDataRedux(userName) {
  return async function (dispatch) {
    dispatch({ type: GET_USER_DATA });

    try {
      const data = await getUserTableData(userName);

      return dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: GET_USER_DATA_ERROR });
      throw new Error(e);
    }
  };
}

export function loginRedux(userName, password) {
  return async function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const data = await login(userName, password);
      dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: LOGIN_REQUEST_FAILURE });
      throw new Error(e);
    }
  };
}

export function createAdminRedux(name, lastName, userName, password, admin) {
  return async function (dispatch) {
    dispatch({ type: CREATE_ADMIN_REQUEST });

    try {
      const data = await createAdminFunc(
        name,
        lastName,
        userName,
        password,
        admin
      );

      dispatch({ type: CREATE_ADMIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: CREATE_ADMIN_FAILURE });
      throw new Error(e);
    }
  };
}

export function createEmployeeRedux(
  name,
  lastName,
  userName,
  personalEmail,
  phoneNumber,
  companyEmail,
  companyNumber,
  slackID,
  salary,
  companyRole
) {
  return async function (dispatch) {
    dispatch({ type: CREATE_EMPLOYEE_REQUEST });
    try {
      const data = await createEmployeeFunc(
        name,
        lastName,
        userName,
        personalEmail,
        phoneNumber,
        companyEmail,
        companyNumber,
        slackID,
        salary,
        companyRole
      );

      dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: CREATE_EMPLOYEE_FAILURE });
      throw new Error(e);
    }
  };
}

export function deleteEmployeeRedux(userName) {
  return async function (dispatch) {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const data = await deleteEmployeeFunc(userName);

      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: DELETE_USER_FAILURE });
      throw new Error(e);
    }
  };
}

export function searchUserByNameRedux(name) {
  return async function (dispatch) {
    dispatch({ type: SEARCH_BY_NAME_REQUEST });
    try {
      const data = await searchUserByNameFunc(name);
      dispatch({ type: SEARCH_BY_NAME_SUCCESS, payload: data });
      return data;
    } catch (e) {
      dispatch({ type: SEARCH_BY_NAME_FAILURE });
      throw new Error(e);
    }
  };
}

export function resetMessageRedux() {
  return function (dispatch) {
    dispatch({ type: RESET_MESSAGE });
  };
}

export function resetAllDataRedux() {
  return function (dispatch) {
    dispatch({ type: RESET_ALL_DATA });
  };
}
