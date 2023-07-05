export class Post {
  constructor(
    private id: string,
    private creator_id: string,
    private content: string,
    private likes: boolean | null,
    private dislikes: boolean | null,
    private created_at: string,
    private updated_at: string
  ) {}

  public getId = (): string => {
    return this.id;
  };

  public getCreatorId = (): string => {
    return this.creator_id;
  };

  public getContent = (): string => {
    return this.content;
  };

  public getLikes = (): boolean | null => {
    return this.likes;
  };

  public getDislikes = (): boolean |null=> {
    return this.dislikes;
  };

  public getCreatedAt = (): string => {
    return this.created_at;
  };

  public getUpdatedAt  = (): string => {
    return this.updated_at;
  };

  public setCreatorId = (input: string): void => {
    this.creator_id = input;
  };

  public setContent = (input: string): void => {
    this.content = input;
  };

  public setLikes = (input: boolean): void => {
    this.likes = input;
  };

  public setDislikes = (input: boolean): void => {
    this.dislikes = input;
  };

  public setCreatedAt = (input: string): void => {
    this.created_at = input;
  };

  public setUpdatedAt = (input: string): void => {
    this.updated_at = input;
  };
}
