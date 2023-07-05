import { TPostDB } from "../models/types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_NAME = "posts";

  public async findPosts(q: string): Promise<TPostDB[]> {
    let postsDB;

    if (q) {
      const result: TPostDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_NAME
      ).where("content", "LIKE", `%${q}%`);

      postsDB = result;
    } else {
      const result: TPostDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_NAME
      );
      postsDB = result;
    }
    return postsDB;
  }

  public async findPostById(id: string): Promise<TPostDB | undefined> {
    const [postDb]: TPostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_NAME
    ).where({ id });

    return postDb;
  }

  public async findPostByCreatorId(
    id: string,
    creator_id: string
  ): Promise<TPostDB | undefined> {
    const [postDb]: TPostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_NAME
    )
      .where({ id, creator_id })

    return postDb;
  }

  public async insertPost(newPostdb: TPostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_NAME).insert(newPostdb);
  }

  public async updatePost(id: string, content: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .update({ content })
      .where({ id });
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .delete()
      .where({ id });
  }
}
