import express from "express";
import request from "request";
import * as dataStorage from "./dataStorage/dataStorage";
import saveDataRecovery from "./dataStorage/dataRecovery/saveDataRecovery";
const app = express();
const PORT = 8080;
const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const GETTING_COINS = "GETTING_COINS";
const AVAILABLE = "AVAILABLE";
const INPROGRESS = "INPROGRESS";
const DONE = "DONE";

app.use(function (req, res, next) {
  //TODO: change Origin before deploy
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.get("/tasks", (req, res) => {
  request(dataStorage.tasks, (error, response, data) => {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    res.send(data);
    // saveDataRecovery(data, `tasksRecovery.json`);
  });
});

app.get("/accounts", (req, res) => {
  request(dataStorage.accounts, (error, response, data) => {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    res.send(data);
    saveDataRecovery(data, `accountsRecovery.json`);
  });
  res.send(data);
});

app.get("/tasks/:taskId", (req, res) => {
  const foundTask = findTask(req, res);

  res.send(foundTask);
});

app.put("/tasks/:taskId/on", (req, res) => {
  const foundTask = findTask(req, res);

  if (foundTask.status !== OFFLINE) {
    return res.status(400).send({ errorMessage: `Task is not offline` });
  }

  foundTask.status = ONLINE;
  res.send(foundTask);
});

app.put("/tasks/:taskId/off", (req, res) => {
  const foundTask = findTask(req, res);

  if (foundTask.status !== ONLINE) {
    return res.status(400).send({ errorMessage: `Server is not online` });
  }

  foundTask.status = OFFLINE;
  res.send(foundTask);
});

app.put(`/tasks/:taskId/reboot`, (req, res) => {
  const foundTask = findTask(req, res);

  if (foundTask.status !== ONLINE) {
    return res.status(400).send({ errorMessage: `Server is not online` });
  }

  foundTask.status = GETTING_COINS;
  setTimeout(() => {
    foundTask.status = ONLINE;
  }, getRandomTime(1000, 5000));

  res.send(foundTask);
});

function findTask(req, res) {
  const taskId = parseInt(req.params.taskId);

  const foundTask = tasks.find((it) => it.id === taskId);
  if (!foundTask) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }
  return foundTask;
}

function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Example app listening at http://localhost:${PORT}/tasks`);
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});
