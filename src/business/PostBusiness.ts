import { LikesDatabase, PostDatabase, UserDatabase } from "../database";

import { Post, PostOutput, TPostDB, USER_ROLES } from "../models";

import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
  DeletePostInputDTO,
  DeletePostOutputDTO,
  EditPostInputDTO,
  EditPostOutputDTO,
  GetPostsInputDTO,
  getPostsOutputDTO,
} from "../dtos/postDto";

import { NotFoundError } from "../errors/NotFoundError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services";
import { BadRequestError, UnauthorazedError } from "../errors";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesDatabase: LikesDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public findPosts = async (
    input: GetPostsInputDTO
  ): Promise<getPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const postsDb = await this.postDatabase.findPosts();

    const response: PostOutput[] = postsDb.map((postDb) => {
      const post = new Post(
        postDb.id,
        postDb.creator_id,
        postDb.content,
        postDb.likes,
        postDb.dislikes,
        postDb.created_at,
        postDb.updated_at,
        postDb.creator_name
      );

      return post.toBusinessModel();
    });

    return response;
  };

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { token, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const userDBExists = await this.userDatabase.findUserById(payload.id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const id = this.idGenerator.generate();

    const newPost: Post = new Post(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
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
    };

    return response;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { id, token, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const userDBExists = await this.userDatabase.findUserById(payload.id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const isPostExists = await this.postDatabase.findPostById(id);

    if (!isPostExists) {
      throw new NotFoundError("não há post cadastrado com esse id");
    }

    const isPostCreator = await this.postDatabase.findPostByCreatorId(
      id,
      payload.id
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
    const { id, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const userDBExists = await this.userDatabase.findUserById(payload.id);

    if (!userDBExists) {
      throw new NotFoundError("não há usuário cadastrado com esse id");
    }

    const isPostExists = await this.postDatabase.findPostById(id);

    if (!isPostExists) {
      throw new NotFoundError("não há post cadastrado com esse id");
    }

    const isPostCreator = await this.postDatabase.findPostByCreatorId(
      id,
      payload.id
    );

    if (!isPostCreator && payload.role === USER_ROLES.NORMAL) {
      throw new UnauthorazedError(
        "você não tem autorização para deletar esse post"
      );
    }

    await this.likesDatabase.deleteAllPostLike(id);

    await this.postDatabase.deletePost(id);

    const response: DeletePostOutputDTO = {
      message: "Post deletado com sucesso!",
    };
    return response;
  };
}
