const express = require("express");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const cors = require("cors");
const numCPUs = require("os").cpus().length;
const fs = require("fs");

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    console.log(`cluster forked for server at cpu number ${i}`);
    cluster.fork();
  }
} else {
  // Workers share the TCP connection in this server
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static("build"));

  app.get("/get-accounts", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      return res.send(arrayData);
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      return res.send(arrayData);
    }
    return res.send([]);
  });

  app.get("/get-user-account", (req, res) => {
    const { userName } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send([]);
      }
      return res.send([jsonData[userName]]);
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send([]);
      }
      return res.send([jsonData[userName]]);
    }

    return res.send([]);
  });

  app.get("/login", (req, res) => {
    const { userName, password } = req.query;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/administrators_dev.json"
      );
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send({ loginSuccess: false });
      }

      if (jsonData[userName].password === password) {
        return res.send({ loginSuccess: true });
      }
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync(
        "./nosqldatabase/administrators_prod.json"
      );
      const jsonData = JSON.parse(rawData);

      if (jsonData[userName] === undefined) {
        return res.send({ loginSuccess: false });
      }

      if (jsonData[userName].password === password) {
        return res.send({ loginSuccess: true });
      }
    }

    return res.send({ loginSuccess: false });
  });

  app.post(
    "/create-account/:name/:lastName/:userName/:admin/:password",
    (req, res) => {
      const { name, lastName, userName, admin, password } = req.params;

      if (process.env.NODE_ENV === "development") {
        const rawData = fs.readFileSync(
          "./nosqldatabase/administrators_dev.json"
        );
        const jsonDataToModify = JSON.parse(rawData);

        jsonDataToModify[userName] = {
          name,
          lastName,
          userName,
          admin,
          password,
        };

        const jsonDataToWrite = JSON.stringify(jsonDataToModify);
        fs.writeFileSync(
          "./nosqldatabase/administrators_dev.json",
          jsonDataToWrite
        );

        return res.send(`Successfully created account`);
      }

      if (process.env.NODE_ENV === "production") {
        const rawData = fs.readFileSync(
          "./nosqldatabase/administrators_prod.json"
        );
        const jsonDataToModify = JSON.parse(rawData);

        jsonDataToModify[userName] = {
          name,
          lastName,
          userName,
          admin,
          password,
        };

        const jsonDataToWrite = JSON.stringify(jsonDataToModify);
        fs.writeFileSync(
          "./nosqldatabase/administrators_prod.json",
          jsonDataToWrite
        );

        return res.send(`Successfully created account`);
      }
      res.send("Could not create user");
    }
  );

  app.post("/create-employee", (req, res) => {
    const { name, lastName, email, userName, phoneNumber } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
        name,
        lastName,
        userName,
        email,
        phoneNumber,
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      return res.send({ message: "Successfully created employee" });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_prod.json");
      const jsonDataToModify = JSON.parse(rawData);

      jsonDataToModify[userName] = {
        name,
        lastName,
        userName,
        email,
        phoneNumber,
      };

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_prod.json", jsonDataToWrite);

      return res.send({ message: "Successfully created employee" });
    }
    res.send("Could not create user");
  });

  app.delete("/delete-employee", (req, res) => {
    const { userName } = req.body;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      delete jsonDataToModify[userName];

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      return res.send({ message: "Successfully deleted employee" });
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./nosqldatabase/accounts_dev.json");
      const jsonDataToModify = JSON.parse(rawData);

      delete jsonDataToModify[userName];

      const jsonDataToWrite = JSON.stringify(jsonDataToModify);
      fs.writeFileSync("./nosqldatabase/accounts_dev.json", jsonDataToWrite);

      return res.send({ message: "Successfully deleted employee" });
    }

    res.send("Could not delete employee");
  });

  // All workers use this port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server listenting in port ${process.env.PORT || 5000}`);
  });
}
