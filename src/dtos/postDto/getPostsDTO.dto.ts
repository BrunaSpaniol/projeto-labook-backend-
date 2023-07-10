import z from "zod";
import { PostOutput } from "../../models";

export interface GetPostsInputDTO {
  token: string; // adicionamos a propriedade token no dto de entrada
}

export type getPostsOutputDTO = PostOutput[];

export const GetPostsSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetPostsInputDTO);
