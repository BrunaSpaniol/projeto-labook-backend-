export class Post {
  constructor(
    private id: string,
    private creator_id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private created_at: string,
    private updated_at: string | null
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

  public getLikes = (): number => {
    return this.likes;
  };

  public getDislikes = (): number => {
    return this.dislikes;
  };

  public getCreatedAt = (): string => {
    return this.created_at;
  };

  public getUpdatedAt = (): string| null => {
    return this.updated_at;
  };

  public setCreatorId = (input: string): void => {
    this.creator_id = input;
  };

  public setContent = (input: string): void => {
    this.content = input;
  };

  public setLikes = (input: number): void => {
    this.likes = input;
  };

  public setDislikes = (input: number): void => {
    this.dislikes = input;
  };

  public setCreatedAt = (input: string): void => {
    this.created_at = input;
  };

  public setUpdatedAt = (input: string): void => {
    this.updated_at = input;
  };
}
