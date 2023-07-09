import { TLikesDislikesDB } from "../models";
import { BaseDatabase } from "./BaseDatabase";

export class LikesDatabase extends BaseDatabase {
  public static TABLE_NAME = "likes_dislikes";

  public async findLike(
    userId: string,
    postId: string
  ): Promise<TLikesDislikesDB | undefined> {
    const [likeDb]: TLikesDislikesDB[] = await BaseDatabase.connection(
      LikesDatabase.TABLE_NAME
    ).where({ user_id: userId, post_id: postId });

    return likeDb;
  }

  public async insertLike(newLikeDb: TLikesDislikesDB): Promise<void> {
    await BaseDatabase.connection(LikesDatabase.TABLE_NAME).insert(newLikeDb);
  }

  public async findAllLikes(): Promise<TLikesDislikesDB[]> {
    const likeDb: TLikesDislikesDB[] = await BaseDatabase.connection(
      LikesDatabase.TABLE_NAME
    );
    return likeDb;
  }

  public async updateLike({
    user_id,
    post_id,
    like,
  }: TLikesDislikesDB): Promise<void> {
    await BaseDatabase.connection(LikesDatabase.TABLE_NAME)
      .update({ like })
      .where({ user_id })
      .andWhere({ post_id });
  }

  public async deleteLike(user_id: string, post_id: string): Promise<void> {
    await BaseDatabase.connection(LikesDatabase.TABLE_NAME)
      .delete()
      .where({ user_id, post_id });
  }

  public async deleteAllPostLike(post_id: string): Promise<void> {
    await BaseDatabase.connection(LikesDatabase.TABLE_NAME)
      .delete()
      .where({ post_id });
  }
}
