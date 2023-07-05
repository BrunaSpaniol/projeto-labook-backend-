import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { TUserDB } from "../models/types";

export class UserController {
  public findUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;

      const userDatabase = new UserDatabase();

      const usersDB = await userDatabase.findUsers(q);

      const result: User[] = usersDB.map((user) => {
        return new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.role,
          user.created_at
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

  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'email' deve ser string");
      }

      if (typeof password !== "string") {
        res.status(400);
        throw new Error("'password' deve ser string");
      }

      if (name.length === 0 || email.length === 0 || password.length === 0) {
        res.status(400);
        throw new Error(
          "'todos os campos devem ser preenchidos para realizar o cadastro"
        );
      }

      const UserDataBase = new UserDatabase();

      const userNameDBExists = await UserDataBase.findUsersByParams<string>("name", name);

      const userDBExists = await UserDataBase.findUsersByParams<string>("email", email);

      if (userNameDBExists) {
        res.status(400);
        throw new Error("esse nome já está cadastrado");
      }

      if (userDBExists) {
        res.status(400);
        throw new Error(
          "esse email já está cadastrado, faça o login ou recupere sua senha"
        );
      }

      const newUser: User = new User(
        `user_${Math.random()}`,
        name,
        email,
        password,
        "ADMIN",
        new Date().toISOString()
      );

      const newUserDB: TUserDB = {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
        created_at: newUser.getCreatedAt(),
      };

      await UserDataBase.insertUser(newUserDB);

      res.status(201).send(newUser);
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

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userDatabase = new UserDatabase();

      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'email' deve ser string");
      }

      if (typeof password !== "string") {
        res.status(400);
        throw new Error("'password' deve ser string");
      }

      if (email.length === 0 || password.length === 0) {
        res.status(400);
        throw new Error(
          "'todos os campos devem ser preenchidos para realizar o cadastro"
        );
      }

      const findUserLogin = await userDatabase.findUserLogin(email, password);

      if(!findUserLogin){
        res.status(400);
        throw new Error("e-mail ou senha incorreta!");
      }

      res.status(200).send(findUserLogin);
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
