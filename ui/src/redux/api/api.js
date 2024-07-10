import axios from "axios";

async function getUsersTableData() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/get-accounts";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/get-accounts";
    }

    const data = await axios.get(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function getUserTableData(userName) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/get-user-account";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/get-user-account";
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch

    const data = await axios(url, { params: { userName: userName } });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export { getUsersTableData, getUserTableData };
