import axios from "axios";

async function getUserTableData() {
  try {
    let url = null;
    if (process.env.NODE_ENV === "development") {
      console.log("Called development", process.env.NODE_ENV);
      url = "http://localhost:5000/get-accounts";
    }
    if (process.env.NODE_ENV === "production") {
      console.log("Called production", process.env.NODE_ENV);
      url = "http://localhost:5000/get-accounts";
    }

    const data = await axios.get(url);

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default getUserTableData;
