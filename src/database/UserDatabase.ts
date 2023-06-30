import { TUserDB, TUserDBPost } from "../models/types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME = "users";

  public async findUsers(q: string): Promise<TUserDB[]> {
    let usersDB;

    if (q) {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_NAME
      ).where("name", "LIKE", `%${q}%`);

      usersDB = result;
    } else {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_NAME
      );
      usersDB = result;
    }
    return usersDB;
  }

  public async findUserById(id: string): Promise<TUserDB | undefined> {
    const [userDb]: TUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_NAME
    ).where({ id });

    return userDb;
  }

  public async insertUser(newUserdb: TUserDBPost): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_NAME).insert(newUserdb);
  }
}
