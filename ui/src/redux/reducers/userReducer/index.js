import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "../../types";

const INTIAL_STATE = {
  error: false,
  loading: true,
  data: [],
};

function userReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      return { error: false, loading: true, data: [] };
    case GET_DATA_SUCCESS:
      return {
        error: false,
        loading: false,
        data: [...action.payload],
      };
    case GET_DATA_ERROR:
      return { error: true, loading: false, data: [] };
    case GET_USER_DATA:
      return { error: false, loading: true, data: [] };
    case GET_USER_DATA_SUCCESS:
      return { error: false, loading: false, data: [...action.payload] };
    case GET_USER_DATA_ERROR:
      return { error: true, loading: false, data: [] };
    default:
      return state;
  }
}

export default userReducer;
