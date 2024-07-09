import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "../../types";
import { getUsersTableData, getUserTableData } from "../../api/api";

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
