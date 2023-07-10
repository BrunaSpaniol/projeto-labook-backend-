export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface TUserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
}

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private created_at: string
  ) {}

  public getId = (): string => {
    return this.id;
  };

  public getName = (): string => {
    return this.name;
  };

  public getEmail = (): string => {
    return this.email;
  };

  public getPassword = (): string => {
    return this.password;
  };

  public getRole = (): USER_ROLES => {
    return this.role;
  };

  public getCreatedAt = (): string => {
    return this.created_at;
  };

  public setName = (input: string): void => {
    this.name = input;
  };

  public setEmail = (input: string): void => {
    this.email = input;
  };

  public setPassword = (input: string): void => {
    this.password = input;
  };

  public setRole = (input: USER_ROLES): void => {
    this.role = input;
  };

  public setCreatedAt = (input: string): void => {
    this.created_at = input;
  };

  public toDBModel(): TUserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.created_at,
    };
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.created_at,
    };
  }
}
