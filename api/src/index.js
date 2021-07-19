import express from "express";
import request from "request";
import * as dataStorage from "./dataStorage/dataStorage";
import saveDataRecovery from "./dataStorage/dataRecovery/saveDataRecovery";

import userRouter from "./routers/userRouter.js";
import tasksRouter from "./routers/tasksRouter.js";
import accountsRouter from "./routers/accountsRouter.js";

const app = express();
const PORT = 8080;

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

// STATIC DATA FROM BACKEND
// app.get("/tasks", (req, res) => {
//   request(dataStorage.tasks, (error, response, data) => {
//     res.send(data);
//     // saveDataRecovery(data, `tasksRecovery.json`);
//   });
// });

app.use("/users", userRouter);
app.use("/tasks", tasksRouter);
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Example app listening at http://localhost:${PORT}/tasks`);
  console.log(`Example app listening at http://localhost:${PORT}/accounts`);
});
