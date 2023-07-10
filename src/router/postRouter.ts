import express from "express";

import { PostController } from "../controller/PostControler";
import { PostBusiness } from "../business";
import { LikesDatabase, PostDatabase, UserDatabase } from "../database";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services";

export const postRouter = express.Router();

const postController = new PostController(
  new PostBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new LikesDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

postRouter.get("/", postController.findPosts);

postRouter.post("/", postController.createPost);

postRouter.put("/:id", postController.editPost);

postRouter.delete("/:id", postController.deletePost);
