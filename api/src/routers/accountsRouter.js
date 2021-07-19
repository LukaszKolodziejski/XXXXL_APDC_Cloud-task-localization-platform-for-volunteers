import express from "express";
import request from "request";
import expressAsyncHandler from "express-async-handler";
import * as dataStorage from "../dataStorage/dataStorage";

const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const GETTING_COINS = "GETTING_COINS";

const accountsRouter = express.Router();

//sending list of product to frontend, '/' is after seed
accountsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.accounts, (error, response, data) => {
      res.send(data);
    });
  })
);

accountsRouter.get(
  "/:accountId",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.accounts, (error, response, data) => {
      const accountId = parseInt(req.params.accountId);

      const foundAccount = data.find((it) => it.id === accountId);
      if (!foundAccount) {
        throw res.status(404).send({ errorMessage: `Account does not exist` });
      }
      res.send(foundAccount);
    });
  })
);

accountsRouter.put(
  "/:accountId/on",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.accounts, (error, response, data) => {
      const accountId = parseInt(req.params.accountId);

      const foundAccount = data.find((it) => it.id === accountId);
      if (foundAccount.status !== GETTING_COINS) {
        return res.status(400).send({ errorMessage: `Account is not online` });
      }
      foundAccount.status = ONLINE;
      res.send(foundAccount);
    });
  })
);

accountsRouter.put(
  "/:accountId/off",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.accounts, (error, response, data) => {
      const accountId = parseInt(req.params.accountId);

      const foundAccount = data.find((it) => it.id === accountId);
      if (foundAccount.status !== OFFLINE) {
        return res.status(400).send({ errorMessage: `Account is not offline` });
      }
      foundAccount.status = OFFLINE;
      res.send(foundAccount);
    });
  })
);

accountsRouter.put(
  "/:accountId/gettingcoins",
  expressAsyncHandler(async (req, res) => {
    request(dataStorage.accounts, (error, response, data) => {
      const accountId = parseInt(req.params.accountId);

      const foundAccount = data.find((it) => it.id === accountId);
      if (foundAccount.status !== GETTING_COINS) {
        return res.status(400).send({ errorMessage: `Account is not done` });
      }
      foundAccount.status = GETTING_COINS;
      res.send(foundAccount);
    });
  })
);

function findAccount(req, res) {
  const accountId = parseInt(req.params.accountId);

  const foundAccount = accounts.find((it) => it.id === accountId);
  if (!foundAccount) {
    throw res.status(404).send({ errorMessage: `Account does not exist` });
  }
  return foundAccount;
}

export default accountsRouter;
