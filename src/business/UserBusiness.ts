import { UserDatabase } from "../database/UserDatabase";
import { User, UserModel, TUserDB, TokenPayload, USER_ROLES } from "../models";
import { HashManager, IdGenerator, TokenManager } from "../services";
import {
  UserLoginInputDTO,
  UserLoginOutputDTO,
} from "../dtos/usersDto/UserLoginDto.dto";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../dtos/usersDto/createUserDto.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/usersDto";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public findUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { token } = input

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("somente admins podem acessar esse recurso");
    }

    const usersDB = await this.userDatabase.findUsers();

    const result: UserModel[] = usersDB.map((userDB) => {
      const user =  new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      );
      return user.toBusinessModel();
    });

    const response: GetUsersOutputDTO = result;

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

    const id = this.idGenerator.generate();

    const isUserIdExists = await this.userDatabase.findUserById(id);

    if (isUserIdExists) {
      throw new BadRequestError("esse id já está cadastrado");
    }

    const hashedPassword = await this.hashManager.hash(password)

    const newUser: User = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.ADMIN,
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

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const response: CreateUserOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      token,
    };

    return response;
  };

  public userLogin = async (
    input: UserLoginInputDTO
  ): Promise<UserLoginOutputDTO> => {
    const { email, password } = input;

    const result = await this.userDatabase.findUserLogin(email);

    if (!result) {
      throw new BadRequestError("e-mail incorreto!");
    }

    const hashedPassword = result.password

    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }

    const findUser: User = new User(
      result?.id,
      result?.name,
      result?.email,
      result?.password,
      result?.role,
      result?.created_at
    );

    const tokenPayload: TokenPayload = {
      id: findUser.getId(),
      name: findUser.getName(),
      role: findUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const response = { message: "usuário logado", token };

    return response;
  };
}
