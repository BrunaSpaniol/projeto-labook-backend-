import { Request, Response } from "express";
import { PostDatabase } from "../database/PostDatabase";
import { TPostDB } from "../models/types";
import { Post } from "../models/Post";
import { UserDatabase } from "../database/UserDatabase";
import { LikesDatabase } from "../database/LikesDatabase";

export class PostController {
  public findPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;

      const postDatabase = new PostDatabase();

      const likesDatabase = new LikesDatabase();

      const postsDB = await postDatabase.findPosts(q);

      const result: Post[] = postsDB.map((post) => {
        return new Post(
          post.id,
          post.creator_id,
          post.content,
          post.likes,
          post.dislikes,
          post.created_at,
          post.updated_at
        );
      });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const { creator_id, content } = req.body;

      if (typeof creator_id !== "string") {
        res.status(400);
        throw new Error("'createUser' deve ser string");
      }

      if (typeof content !== "string") {
        res.status(400);
        throw new Error("'content' deve ser string");
      }

      if (creator_id.length === 0 || content.length === 0) {
        res.status(400);
        throw new Error(
          "Para criar um post é necessário a identificação do usuário e o conteúdo"
        );
      }
      const userDatabase = new UserDatabase();

      const userDBExists = await userDatabase.findUserById(creator_id);

      if (!userDBExists) {
        res.status(400);
        throw new Error("não há usuário cadastrado com esse id");
      }

      const newPost: Post = new Post(
        `post_${Math.random()}`,
        creator_id,
        content,
        null,
        null,
        new Date().toISOString(),
        new Date().toISOString()
      );

      const newPostDB: TPostDB = {
        id: newPost.getId(),
        creator_id: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        created_at: newPost.getCreatedAt(),
        updated_at: newPost.getUpdatedAt(),
      };

      const postDatabase = new PostDatabase();

      await postDatabase.insertPost(newPostDB);

      res.status(201).send(newPostDB);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { creator_id, content } = req.body;

      if (typeof creator_id !== "string") {
        res.status(400);
        throw new Error("'createUser' deve ser string");
      }

      if (typeof content !== "string") {
        res.status(400);
        throw new Error("'content' deve ser string");
      }

      if (creator_id.length === 0 || content.length === 0 || !id) {
        res.status(400);
        throw new Error(
          "Para criar um post é necessário a identificação do usuário e o conteúdo"
        );
      }

      const userDatabase = new UserDatabase();

      const userDBExists = await userDatabase.findUserById(creator_id);

      if (!userDBExists) {
        res.status(400);
        throw new Error("não há usuário cadastrado com esse id");
      }

      const postDatabase = new PostDatabase();

      const isPostExists = await postDatabase.findPostById(id);

      if (!isPostExists) {
        res.status(400);
        throw new Error("não há post cadastrado com esse id");
      }

      const isPostCreator = await postDatabase.findPostByCreatorId(
        id,
        creator_id
      );

      if (!isPostCreator) {
        res.status(400);
        throw new Error("não há esse post escrito pelo usuário");
      }

      await postDatabase.updatePost(id, content);

      res.status(201).send("Post editado com sucesso!");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { creator_id } = req.body;

      if (typeof creator_id !== "string") {
        res.status(400);
        throw new Error("'createUser' deve ser string");
      }

      if (creator_id.length === 0 || !id) {
        res.status(400);
        throw new Error(
          "Para deletar um post é necessário a identificação do usuário e do post"
        );
      }

      const userDatabase = new UserDatabase();

      const userDBExists = await userDatabase.findUserById(creator_id);

      if (!userDBExists) {
        res.status(400);
        throw new Error("não há usuário cadastrado com esse id");
      }

      const postDatabase = new PostDatabase();

      const isPostExists = await postDatabase.findPostById(id);

      if (!isPostExists) {
        res.status(400);
        throw new Error("não há post cadastrado com esse id");
      }

      const isPostCreator = await postDatabase.findPostByCreatorId(
        id,
        creator_id
      );

      if (!isPostCreator) {
        res.status(400);
        throw new Error("não há esse post escrito pelo usuário");
      }

      await postDatabase.deletePost(id);

      res.status(201).send("Post deletado com sucesso!");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
