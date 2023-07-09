import { LikesDatabase, PostDatabase, UserDatabase } from "../database";

import { Post, TPostDB } from "../models";

import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
  DeletePostInputDTO,
  DeletePostOutputDTO,
  EditPostInputDTO,
  EditPostOutputDTO,
} from "../dtos/postDto";

import { NotFoundError } from "../errors/NotFoundError";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesDatabase: LikesDatabase
  ) {}

  public findPosts = async () => {
    const response = await this.postDatabase.findPosts();

    return response;
  };

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { creator_id, content } = input;

    const userDBExists = await this.userDatabase.findUserById(creator_id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const newPost: Post = new Post(
      `post_${Math.random()}`,
      creator_id,
      content,
      0,
      0,
      new Date().toISOString(),
      null
    );

    const newPostDB: TPostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    await this.postDatabase.insertPost(newPostDB);

    const response: CreatePostOutputDTO = {
      message: "Post publicado com sucesso!",
      post: newPostDB,
    };

    return response;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { id, creator_id, content } = input;

    const userDBExists = await this.userDatabase.findUserById(creator_id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const isPostExists = await this.postDatabase.findPostById(id);

    if (!isPostExists) {
      throw new NotFoundError("não há post cadastrado com esse id");
    }

    const isPostCreator = await this.postDatabase.findPostByCreatorId(
      id,
      creator_id
    );

    if (!isPostCreator) {
      throw new NotFoundError("não há esse post escrito pelo usuário");
    }

    await this.postDatabase.updatePost(id, content);

    const response: EditPostOutputDTO = {
      message: "Post editado com sucesso!",
    };
    return response;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { id, creator_id } = input;

    const userDBExists = await this.userDatabase.findUserById(creator_id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const isPostExists = await this.postDatabase.findPostById(id);

    if (!isPostExists) {
      throw new NotFoundError("não há post cadastrado com esse id");
    }

    const isPostCreator = await this.postDatabase.findPostByCreatorId(
      id,
      creator_id
    );

    if (!isPostCreator) {
      throw new NotFoundError("não há esse post escrito pelo usuário");
    }

    await this.likesDatabase.deleteAllPostLike(id);

    await this.postDatabase.deletePost(id);

    const response: DeletePostOutputDTO = {
      message: "Post deletado com sucesso!",
    };
    return response;
  };
}
