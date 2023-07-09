import { Request, Response } from "express";

import { ZodError } from "zod";

import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { CreateUserSchema } from "../dtos/usersDto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public findUsers = async (req: Request, res: Response) => {
    try {
      const response = await this.userBusiness.findUsers();

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.createUser(input);

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

  public userLogin = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.userLogin(input);

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
}
