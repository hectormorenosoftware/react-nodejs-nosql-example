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
} from "../../types";

const INTIAL_STATE = {
  error: false,
  loading: false,
  data: [],
  loginSuccess: false,
};

function userReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      return { error: false, loading: true, data: [], loginSuccess: true };
    case GET_DATA_SUCCESS:
      return {
        error: false,
        loading: false,
        data: [...action.payload],
        loginSuccess: true,
      };
    case GET_DATA_ERROR:
      return { error: true, loading: false, data: [], loginSuccess: true };
    case GET_USER_DATA:
      return { error: false, loading: true, data: [], loginSuccess: true };
    case GET_USER_DATA_SUCCESS:
      return {
        error: false,
        loading: false,
        data: [...action.payload],
        loginSuccess: true,
      };
    case GET_USER_DATA_ERROR:
      return { error: true, loading: false, data: [], loginSuccess: true };
    case LOGIN_REQUEST:
      return { error: false, loading: true, data: [], loginSuccess: false };
    case LOGIN_REQUEST_SUCCESS:
      return {
        error: false,
        loading: false,
        data: [],
        loginSuccess: action.payload.loginSuccess,
      };
    case LOGIN_REQUEST_FAILURE:
      return { error: false, loading: false, data: [], loginSuccess: false };
    default:
      return state;
  }
}

export default userReducer;
