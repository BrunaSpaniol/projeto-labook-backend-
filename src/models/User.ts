import { USER_ROLES } from "./types";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: keyof typeof USER_ROLES,
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

  public getRole = (): keyof typeof USER_ROLES => {
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

  public setRole = (input: keyof typeof USER_ROLES): void => {
    this.role = input;
  };

  public setCreatedAt = (input: string): void => {
    this.created_at = input;
  };
}
