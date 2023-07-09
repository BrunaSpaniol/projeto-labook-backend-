import { Request, Response } from "express";
import { ZodError } from "zod";

import { LikeBusiness } from "../business";
import { BaseError } from "../errors";
import { CreateLikeSchema } from "../dtos/likeDTO/createLikeDto.dto";

export class LikesController {
  constructor(private LikeBusiness: LikeBusiness) {}

  public createLikeOrDislike = async (req: Request, res: Response) => {
    try {
      const input = CreateLikeSchema.parse({
        postId: req.params.id,
        like: req.body.like,
        userId: req.body.userId,
      });

      const output = await this.LikeBusiness.createLikeOrDislike(input);

      res.status(200).send(output);
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

  public findLikes = async (req: Request, res: Response) => {
    try {
      const output = await this.LikeBusiness.findLikes();

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteAllLikes = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;

      const output = await this.LikeBusiness.deleteAllLikes(postId);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
