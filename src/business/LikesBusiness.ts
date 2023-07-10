import { LikesDatabase, PostDatabase, UserDatabase } from "../database";

import { Like, LikeInput, TLikesDislikesDB } from "../models";
import {
  CreateLikeInputDTO,
  CreateLikeOutputDTO,
} from "../dtos/likeDTO/createLikeDto.dto";

import { BadRequestError, NotFoundError } from "../errors";
import { TokenManager } from "../services";

export class LikeBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesDatabase: LikesDatabase,
    private tokenManager: TokenManager
  ) {}

  public createLikeOrDislike = async (input: CreateLikeInputDTO) => {
    const { postId, like, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const userId = payload.id;

    const isPostExists = await this.postDatabase.findPostById(postId);

    if (!isPostExists) {
      throw new NotFoundError(" O post não existe");
    }

    const isUserExists = await this.userDatabase.findUserById(userId);

    if (!isUserExists) {
      throw new NotFoundError("você precisa se cadastrar para curtir os posts");
    }

    const isPostCreatorUser = await this.postDatabase.findPostByCreatorId(
      postId,
      userId
    );

    if (isPostCreatorUser) {
      throw new BadRequestError(" Você não poder dar like/dislike no seu post");
    }

    //procura se o usuário já deu o like no post
    const isUserAlreadyLiked = await this.likesDatabase.findLike(
      userId,
      postId
    );

    const setLike = LikeInput[like];

    const newLike: Like = new Like(userId, postId, setLike);

    const isLikeorDislike = setLike === 1 ? "likes" : "dislikes";

    const newLikeDB: TLikesDislikesDB = {
      user_id: newLike.getUserId(),
      post_id: newLike.getPostId(),
      like: setLike,
    };

    //se o post ainda não teve nenhum like, ou se o usuário ainda não deu like ou dislike no post
    if (isUserAlreadyLiked === undefined || !isUserAlreadyLiked) {
      await this.likesDatabase.insertLike(newLikeDB);

      await this.postDatabase.AddLikeOrDislike(postId, isLikeorDislike);

      const response: CreateLikeOutputDTO = {
        message: "Like cadastrado com sucesso!",
      };

      return response;
    }

    if (!!isUserAlreadyLiked) {
      //Caso o usuário já tenha dado like antes e dê like novamente
      if (setLike === isUserAlreadyLiked.like) {
        await this.likesDatabase.deleteLike(userId, postId);
      }

      //Caso o usuário tenha dado like anteriormente e agora deu dislike ou o oposto
      if (setLike !== isUserAlreadyLiked.like) {
        await this.likesDatabase.updateLike(newLikeDB);
      }

      const [likes, dislikes] = await this.likesDatabase.getLikes(postId);

      await this.postDatabase.updateLikePost(
        postId,
        likes.length,
        dislikes.length
      );

      const response = { message: "Like atualizado com sucesso!" };

      return response;
    }
  };

  public findLikes = async () => {
    const likeDatabase = new LikesDatabase();

    const likesDB = await likeDatabase.findAllLikes();

    const newLikes: Like[] = likesDB.map((like) => {
      return new Like(like.user_id, like.post_id, like.like);
    });

    const response = newLikes;

    return response;
  };

  public deleteAllLikes = async (postId: string) => {
    await this.likesDatabase.deleteAllPostLike(postId);

    await this.postDatabase.updateLikePost(postId, 0, 0);

    const response = "todos os likes foram deletados";

    return response;
  };
}
