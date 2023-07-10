import express from "express";

import { LikesController } from "../controller/LikesControler";
import { LikeBusiness } from "../business";
import { LikesDatabase, PostDatabase, UserDatabase } from "../database";
import { TokenManager } from "../services";

export const likesRouter = express.Router();

const likesController = new LikesController(
  new LikeBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new LikesDatabase(),
    new TokenManager()
  )
);

likesRouter.post("/:id", likesController.createLikeOrDislike);

likesRouter.get("/", likesController.findLikes);

likesRouter.delete("/:postId", likesController.deleteAllLikes);
