import { LikesDatabase, PostDatabase, UserDatabase } from "../database";

import { Like, LikeInput, TLikesDislikesDB } from "../models";
import {
  CreateLikeInputDTO,
  CreateLikeOutputDTO,
} from "../dtos/likeDTO/createLikeDto.dto";

import { BadRequestError, NotFoundError } from "../errors";

export class LikeBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesDatabase: LikesDatabase
  ) {}

  public createLikeOrDislike = async (input: CreateLikeInputDTO) => {
    const { postId, like, userId } = input;

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

    //se o post ainda não teve nenhum like, ou se o usuário ainda não deu like ou dislike no post
    if (isUserAlreadyLiked?.like === undefined) {
      const newLikeDB: TLikesDislikesDB = {
        user_id: newLike.getUserId(),
        post_id: newLike.getPostId(),
        like: setLike,
      };

      await this.likesDatabase.insertLike(newLikeDB);

      await this.postDatabase.AddLikeOrDislike(postId, isLikeorDislike);

      const response: CreateLikeOutputDTO = {
        message: "Like cadastrado com sucesso!",
      };

      return response;
    }

    //Caso o usuário já tenha dado like antes e dê like novamente
    if (setLike === isUserAlreadyLiked?.like) {
      await this.postDatabase.RemoveLikeOrDislike(postId, isLikeorDislike);

      await this.likesDatabase.deleteLike(userId, postId);

      const response = { message: "Like removido com sucesso!" };

      return response;
    }

    //Caso o usuário tenha dado like anteriormente e agora deu dislike ou o oposto

    const newLikeDB: TLikesDislikesDB = {
      user_id: newLike.getUserId(),
      post_id: newLike.getPostId(),
      like: setLike,
    };

    if (isLikeorDislike === "likes") {
      await this.postDatabase.updateLikePost(postId, "dislikes", "likes");
    } else {
      await this.postDatabase.updateLikePost(postId, "likes", "dislikes");
    }

    await this.likesDatabase.updateLike(newLikeDB);

    const response = { message: "Like atualizado com sucesso!" };
    return response;
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

  public deleteAllLikes = async (q: string) => {
    await this.likesDatabase.deleteAllPostLike(q);

    const response = "todos os likes foram deletados";

    return response;
  };
}
