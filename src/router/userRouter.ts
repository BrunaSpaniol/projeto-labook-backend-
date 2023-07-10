import express from "express";

import { UserController } from "../controller/UserControler";
import { UserBusiness } from "../business";
import { UserDatabase } from "../database";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager, TokenManager } from "../services";

export const userRouter = express.Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

userRouter.get("/", userController.findUsers);

userRouter.post("/signup", userController.createUser);

userRouter.get("/login", userController.userLogin);
