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
      const rawData = fs.readFileSync("./database/accounts_dev.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      res.send(arrayData);
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./database/accounts_prod.json");
      const jsonData = JSON.parse(rawData);
      const arrayData = Object.values(jsonData);

      res.send(arrayData);
    }
  });

  app.get("/get-user-account/:userName", (req, res) => {
    const { userName } = req.params;

    if (process.env.NODE_ENV === "development") {
      const rawData = fs.readFileSync("./database/accounts_dev.json");
      const jsonData = JSON.parse(rawData);

      res.send([jsonData[userName]]);
    }

    if (process.env.NODE_ENV === "production") {
      const rawData = fs.readFileSync("./database/accounts_prod.json");
      const jsonData = JSON.parse(rawData);

      res.send([jsonData[userName]]);
    }
  });

  // All workers use this port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server listenting in port ${process.env.PORT || 5000}`);
  });
}
