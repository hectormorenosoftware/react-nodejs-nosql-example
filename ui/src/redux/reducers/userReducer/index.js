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
} from "../../types";

const INTIAL_STATE = {
  error: false,
  loading: false,
  data: [],
  loginSuccess: false,
  createAdminMessage: "",
  createEmployeeMessage: "",
};

function userReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        loading: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case GET_USER_DATA:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...action.payload],
      };
    case GET_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        data: [],
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: [],
        loginSuccess: false,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [],
        loginSuccess: action.payload.loginSuccess,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        error: false,
        loading: false,
        data: [],
        loginSuccess: false,
      };
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        createAdminMessage: "",
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        createAdminMessage: action.payload,
      };
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        createAdminMessage: "",
      };
    case RESET_MESSAGE:
      return {
        ...state,
        createAdminMessage: "",
        createEmployeeMessage: "",
      };
    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        createEmployeeMessage: "",
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        createEmployeeMessage: action.payload,
      };
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: false,
        loading: false,
        createEmployeeMessage: "",
      };

    case RESET_ALL_DATA:
      return { ...INTIAL_STATE };
    default:
      return state;
  }
}

export default userReducer;
