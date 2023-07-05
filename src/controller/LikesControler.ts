import { Request, Response } from "express";

import { TLikesDislikesDB } from "../models/types";

import { LikesDatabase } from "../database/LikesDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Like } from "../models/Likes";

export class LikesController {
  public createLikeOrDislike = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;

      const { like, userId } = req.body;

      const postDatabase = new PostDatabase();

      const userDatabase = new UserDatabase();

      const likeDatabase = new LikesDatabase();

      const isPostExists = await postDatabase.findPostById(postId);

      if (!isPostExists) {
        res.status(400);
        throw new Error(" O post não existe");
      }

      const isUserExists = await userDatabase.findUserById(userId);

      if (!isUserExists) {
        res.status(400);
        throw new Error("você precisa se cadastrar para curtir os posts");
      }

      const isPostCreatorUser = await postDatabase.findPostByCreatorId(
        postId,
        userId
      );

      if (isPostCreatorUser) {
        res.status(400);
        throw new Error(" Você não poder dar like/dislike no seu post");
      }

      const isUserAlreadyLiked = await likeDatabase.findLike(userId, postId);

      const isAlreadyLiked = isUserAlreadyLiked?.like === 1 ? true : false;

      if (isPostExists.likes === null || !isUserAlreadyLiked) {
        const newLike: Like = new Like(userId, postId, like);

        const isLike = newLike.getLikes() ? 1 : 0;

        const newLikeDB: TLikesDislikesDB = {
          user_id: newLike.getUserId(),
          post_id: newLike.getPostId(),
          like: isLike,
        };

        await likeDatabase.insertLike(newLikeDB);

        res.status(200).send("Like cadastrado com sucesso!");
      }

      if (like === isAlreadyLiked) {
        await likeDatabase.deleteLike(userId, postId);

        res.status(200).send("Like removido com sucesso!");
      }

      const newLike: Like = new Like(userId, postId, like);

      const isLike = newLike.getLikes() ? 1 : 0;

      const newLikeDB: TLikesDislikesDB = {
        user_id: newLike.getUserId(),
        post_id: newLike.getPostId(),
        like: isLike,
      };

      await likeDatabase.updateLike(newLikeDB);

      res.status(200).send("Like atualizado com sucesso!");
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public findLikes = async (req: Request, res: Response) => {
    try {
      const likeDatabase = new LikesDatabase();

      const likesDB = await likeDatabase.findAllLikes();

      const result: Like[] = likesDB.map((like) => {
        let boleanLike: boolean | null;

        if (like.like === null) {
          boleanLike = null;
        } else {
          boleanLike = like.like === 0 ? false : true;
        }

        return new Like(like.user_id, like.post_id, boleanLike);
      });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
