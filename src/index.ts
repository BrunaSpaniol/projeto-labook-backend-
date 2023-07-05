import express from "express";

import cors from "cors";

import { UserController } from "./controller/UserControler";
import { PostController } from "./controller/PostControler";
import { LikesController } from "./controller/LikesControler";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

const userController = new UserController();

const postController = new PostController();

const likesController = new LikesController();

app.get("/users", userController.findUsers);

app.post("/users/signup", userController.createUser);

app.get("/users/login", userController.userLogin);

app.get("/posts", postController.findPosts);

app.post("/posts", postController.createPost);

app.put("/posts/:id", postController.editPost);

app.delete("/posts/:id", postController.deletePost);

app.post("/likes/:id", likesController.createLikeOrDislike);

app.get("/likes", likesController.findLikes);