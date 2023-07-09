import { Request, Response } from "express";

import { ZodError } from "zod";

import { PostBusiness } from "../business";
import { BaseError } from "../errors";
import {
  CreatePostSchema,
  EditPostSchema,
  DeletePostSchema,
} from "../dtos/postDto";

export class PostController {
  constructor(private PostBusiness: PostBusiness) {}

  public findPosts = async (req: Request, res: Response) => {
    try {

      const output = await this.PostBusiness.findPosts();

      res.status(200).send(output);
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
      const input = CreatePostSchema.parse({
        creator_id: req.body.creator_id,
        content: req.body.content,
      });

      const output = await this.PostBusiness.createPost(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        id: req.params.id,
        creator_id: req.body.creator_id,
        content: req.body.content,
      });

      const output = await this.PostBusiness.editPost(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        id: req.params.id,
        creator_id: req.body.creator_id,
      });

      const output = await this.PostBusiness.deletePost(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
