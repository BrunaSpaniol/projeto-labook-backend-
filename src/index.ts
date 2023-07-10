import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import { userRouter } from "./router/userRouter";
import { likesRouter } from "./router/likesRouter";
import { postRouter } from "./router/postRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const portNumber = Number(process.env.PORT) || 3003;

app.listen(portNumber, () => {
  console.log(`Servidor rodando na porta ${portNumber}`);
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.use("/likes", likesRouter);
