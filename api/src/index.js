const express = require("express");
const app = express();
const PORT = 8080;
const tasks = require("./tasks.json");
const users = require("./users.json");
const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const GETTING_COINS = "GETTING_COINS";
const AVAILABLE = "AVAILABLE";
const INPROGRESS = "INPROGRESS";
const DONE = "DONE";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.get("/users", (req, res) => {
  res.send(tasks);
});

app.get("/tasks/:taskId", (req, res) => {
  const foundServer = findServer(req, res);

  res.send(foundServer);
});

app.put("/tasks/:taskId/on", (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== OFFLINE) {
    return res.status(400).send({ errorMessage: `Task is not offline` });
  }

  foundServer.status = ONLINE;
  res.send(foundServer);
});

app.put("/tasks/:taskId/off", (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== ONLINE) {
    return res.status(400).send({ errorMessage: `Server is not online` });
  }

  foundServer.status = OFFLINE;
  res.send(foundServer);
});

app.put(`/tasks/:taskId/reboot`, (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== ONLINE) {
    return res.status(400).send({ errorMessage: `Server is not online` });
  }

  foundServer.status = GETTING_COINS;
  setTimeout(() => {
    foundServer.status = ONLINE;
  }, getRandomTime(1000, 5000));

  res.send(foundServer);
});

function findServer(req, res) {
  const taskId = parseInt(req.params.taskId);

  const foundServer = tasks.find((it) => it.id === taskId);
  if (!foundServer) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }
  return foundServer;
}

function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Example app listening at http://localhost:${PORT}/tasks`);
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});
