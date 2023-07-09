import express from "express";

import { UserController } from "../controller/UserControler";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.findUsers);

userRouter.post("/signup", userController.createUser);

userRouter.get("/login", userController.userLogin);
