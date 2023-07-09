import { UserDatabase } from "../database/UserDatabase";
import {
  UserLoginInputDTO,
  UserLoginOutputDTO,
} from "../dtos/usersDto/UserLoginDto.dto";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../dtos/usersDto/createUserDto.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { TUserDB } from "../models/types";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}

  public findUsers = async () => {
    const usersDB = await this.userDatabase.findUsers();

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

    const response: User[] = result;

    return response;
  };

  public createUser = async (
    input: CreateUserInputDTO
  ): Promise<CreateUserOutputDTO> => {
    const { name, email, password } = input;

    const userNameDBExists = await this.userDatabase.findUsersByParams<string>(
      "name",
      name
    );

    const userDBExists = await this.userDatabase.findUsersByParams<string>(
      "email",
      email
    );

    if (userNameDBExists) {
      throw new BadRequestError("esse nome já está cadastrado");
    }

    if (userDBExists) {
      throw new BadRequestError(
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

    await this.userDatabase.insertUser(newUserDB);

    const response: CreateUserOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      user: {
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        createdAt: newUser.getCreatedAt(),
      },
    };

    return response;
  };

  public userLogin = async (
    input: UserLoginInputDTO
  ): Promise<UserLoginOutputDTO> => {
    const { email, password } = input;

    const result = await this.userDatabase.findUserLogin(email, password);

    if (!result) {
      throw new BadRequestError("e-mail ou senha incorreta!");
    }

    const response = { message: "usuário encontrado", user: result };

    return response;
  };
}
