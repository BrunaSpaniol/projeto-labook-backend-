import express from "express";

import { LikesController } from "../controller/LikesControler";

export const likesRouter = express.Router();

const likesController = new LikesController();

likesRouter.post("/:id", likesController.createLikeOrDislike);

likesRouter.get("/", likesController.findLikes);

likesRouter.delete("/:postId", likesController.deleteAllLikes);
