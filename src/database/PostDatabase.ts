import { PostOutput, TPostDB } from "../models";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_NAME = "posts";

  public async findPosts(): Promise<PostOutput[]> {
    const result = await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .select(
        "posts.id AS id",
        "content",
        "likes",
        "dislikes",
        "posts.created_at",
        "updated_at",
        "users.id AS creator_id",
        "name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id");

    const postsDB: PostOutput[] = result.map((post) => {
      return {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislikes,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        creator: {
          id: post.creator_id,
          name: post.creator_name,
        },
      };
    });

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
    ).where({ id, creator_id });

    return postDb;
  }

  public async insertPost(newPostdb: TPostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_NAME).insert(newPostdb);
  }

  public async updatePost(id: string, content: string): Promise<void> {
    const updated_at: string = new Date().toISOString();

    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .update({ content, updated_at })
      .where({ id });
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .delete()
      .where({ id });
  }

  public async updateLikePost(
    id: string,
    increment: "likes" | "dislikes",
    decrement: "likes" | "dislikes"
  ): Promise<void> {
    const updated_at: string = new Date().toISOString();

    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ id })
      .update({ updated_at })
      .increment(`${increment}`, 1)
      .decrement(`${decrement}`, 1);
  }

  public async AddLikeOrDislike(
    id: string,
    action: "likes" | "dislikes"
  ): Promise<void> {
    const updated_at: string = new Date().toISOString();

    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ id })
      .update({ updated_at })
      .increment(`${action}`, 1);
  }

  public async RemoveLikeOrDislike(
    id: string,
    action: "likes" | "dislikes"
  ): Promise<void> {
    const updated_at: string = new Date().toISOString();

    await BaseDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ id })
      .update({ updated_at })
      .decrement(`${action}`, 1);
  }
}
