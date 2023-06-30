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
      const { id, name, email, password } = req.body;
  
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
  
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
  
      const UserDataBase = new UserDatabase();
  
      const userDBExists = await UserDataBase.findUserById(id);
  
      if (userDBExists) {
        res.status(400);
        throw new Error("'id' já existe");
      }
  
      const newUser: User = new User(
        id,
        name,
        email,
        password,
        new Date().toISOString()
      );
  
      const newUserDB: TUserDB = {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
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
  }  
}
