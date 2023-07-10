export interface TPostDB {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string | null;
  creator_id: string;
  creator_name?: string;
}

export interface PostOutput {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string | null;
  creator: {
    id: string;
    name: string;
  };
}

export class Post {
  constructor(
    private id: string,
    private creator_id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private created_at: string,
    private updated_at: string | null,
    private creator_name?: string
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

  public getUpdatedAt = (): string | null => {
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

  public toDBModel(): TPostDB {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.created_at,
      updated_at: this.updated_at,
      creator_id: this.creator_id,
      creator_name: this.creator_name,
    };
  }

  public toBusinessModel(): PostOutput {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      creator: {
        id: this.creator_id,
        name: this.creator_name ?? "",
      },
    };
  }
}
