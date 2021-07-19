import express from "express";
import request from "request";
import expressAsyncHandler from "express-async-handler";
import * as dataStorage from "../dataStorage/dataStorage";

const AVAILABLE = "AVAILABLE";
const INPROGRESS = "INPROGRESS";
const DONE = "DONE";
const CONFIRMED = "CONFIRMED";

const tasksRouter = express.Router();

//sending list of product to frontend, '/' is after seed
tasksRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      res.send(data);
    });
  })
);

tasksRouter.get(
  "/:taskId",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const taskId = parseInt(req.params.taskId);

      const foundTask = data.find((it) => it.id === taskId);
      if (!foundTask) {
        throw res.status(404).send({ errorMessage: `Task does not exist` });
      }
      res.send(foundTask);
    });
  })
);

tasksRouter.put(
  "/:taskId/available",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const taskId = parseInt(req.params.taskId);

      const foundTask = data.find((it) => it.id === taskId);
      if (foundTask.status !== DONE) {
        return res.status(400).send({ errorMessage: `Task is not done` });
      }
      foundTask.status = AVAILABLE;
      res.send(foundTask);
    });
  })
);

tasksRouter.put(
  "/:taskId/inprogress",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const taskId = parseInt(req.params.taskId);

      const foundTask = data.find((it) => it.id === taskId);
      if (foundTask.status !== INPROGRESS) {
        return res
          .status(400)
          .send({ errorMessage: `Task is not in progress` });
      }
      foundTask.status = INPROGRESS;
      res.send(foundTask);
    });
  })
);

tasksRouter.put(
  "/:taskId/done",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const taskId = parseInt(req.params.taskId);

      const foundTask = data.find((it) => it.id === taskId);
      if (foundTask.status !== DONE) {
        return res.status(400).send({ errorMessage: `Task is not done` });
      }
      foundTask.status = DONE;
      res.send(foundTask);
    });
  })
);

tasksRouter.put(
  "/:taskId/confirmed",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const taskId = parseInt(req.params.taskId);

      const foundTask = data.find((it) => it.id === taskId);
      if (foundTask.status !== CONFIRMED) {
        return res.status(400).send({ errorMessage: `Task is not confirmed` });
      }
      foundTask.status = CONFIRMED;
      res.send(foundTask);
    });
  })
);

tasksRouter.put(
  "/:taskId/player/:player",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.tasks, (error, response, data) => {
      const { taskId, player } = parseInt(req.params);

      const foundTask = data.find((it) => it.id === taskId);
      if (foundTask.status !== CONFIRMED) {
        return res.status(400).send({ errorMessage: `Task is not confirmed` });
      }
      foundTask.player = player;
      res.send(foundTask);
    });
  })
);

function findTask(req, res) {
  const taskId = parseInt(req.params.taskId);

  const foundTask = tasks.find((it) => it.id === taskId);
  if (!foundTask) {
    throw res.status(404).send({ errorMessage: `Task does not exist` });
  }
  return foundTask;
}

export default tasksRouter;
