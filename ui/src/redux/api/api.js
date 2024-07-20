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

async function login(userName, password) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/login";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/login";
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch

    const data = await axios(url, {
      params: { userName: userName, password: password },
    });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function createAdminFunc(name, lastName, userName, password, admin) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:5000/create-account/${name}/${lastName}/${userName}/${admin}/${password}`;
    }
    if (process.env.NODE_ENV === "production") {
      url = `http://localhost:5000/create-account/${name}/${lastName}/${userName}/${admin}/${password}`;
    }

    //axios and fetch in this scenario is the same syntax because
    //you can't send a body on a GET request using axios or fetch

    const data = await axios.post(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

async function createEmployeeFunc(
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
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/create-employee";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/create-employee";
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        userName: userName,
        personalEmail: personalEmail,
        phoneNumber: phoneNumber,
        companyEmail: companyEmail,
        companyNumber: companyNumber,
        slackID: slackID,
        salary: salary,
        companyRole: companyRole,
      }),
      headers: myHeaders,
    });

    const res = await data.json();

    return res;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteEmployeeFunc(userName) {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/delete-employee";
    }
    if (process.env.NODE_ENV === "production") {
      url = "http://localhost:5000/delete-employee";
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        userName: userName,
      }),
      headers: myHeaders,
    });

    const res = await data.json();

    return res;
  } catch (e) {
    throw new Error(e);
  }
}

export {
  getUsersTableData,
  getUserTableData,
  login,
  createAdminFunc,
  createEmployeeFunc,
  deleteEmployeeFunc,
};
