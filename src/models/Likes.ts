export enum LikeInput {
  "true" = 1,
  "false" = 0,
}

export enum PostLike {
  "true" = "likes",
  "false" = "dislikes",
}

export interface TLikesDislikesDB {
  user_id: string;
  post_id: string;
  like: 1 | 0 | null;
}

export class Like {
  constructor(
    private userId: string,
    private postId: string,
    private likes: 1 | 0 | null
  ) {}

  public getUserId = (): string => {
    return this.userId;
  };

  public getPostId = (): string => {
    return this.postId;
  };

  public getLikes = (): 1 | 0 | null => {
    return this.likes;
  };

  public setUserId = (input: string): void => {
    this.userId = input;
  };

  public setPostId = (input: string): void => {
    this.postId = input;
  };

  public setLikes = (input: 1 | 0 | null): void => {
    this.likes = input;
  };
}
