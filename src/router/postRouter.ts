import express from "express";

import { PostController } from "../controller/PostControler";

export const postRouter = express.Router();

const postController = new PostController();


postRouter.get("/", postController.findPosts);

postRouter.post("/", postController.createPost);

postRouter.put("/:id", postController.editPost);

postRouter.delete("/:id", postController.deletePost);