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
      url = `http://localhost:5000/get-user-account/${userName}`;
    }
    if (process.env.NODE_ENV === "production") {
      url = `http://localhost:5000/get-user-account/${userName}`;
    }

    const data = await axios(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export { getUsersTableData, getUserTableData };
