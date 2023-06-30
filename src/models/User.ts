export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
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

  public setCreatedAt = (input: string): void => {
    this.created_at = input;
  };
}

const user = new User("1", "bruna", "email@email.com", "jhdjhsdjhsd", "agora");

user.getName
user.setName("Raoni");

console.log(user);
