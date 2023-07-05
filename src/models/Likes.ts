export class Like {
  constructor(
    private userId: string,
    private postId: string,
    private likes: boolean | null
  ) {}

  public getUserId = (): string => {
    return this.userId;
  };

  public getPostId = (): string => {
    return this.postId;
  };

  public getLikes = (): boolean | null => {
    return this.likes;
  };

  public setUserId = (input: string): void => {
    this.userId = input;
  };

  public setPostId = (input: string): void => {
    this.postId = input;
  };

  public setLikes = (input: boolean): void => {
    this.likes = input;
  };
}
