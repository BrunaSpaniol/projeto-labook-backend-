import z from "zod";
import { TPostDB } from "../../models/types";

export interface CreatePostInputDTO {
  creator_id: string;
  content: string;
}

export interface CreatePostOutputDTO {
  message: string;
  post: TPostDB
}

export const CreatePostSchema = z
  .object({
    creator_id: z
      .string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string",
      })
      .min(1, "'id' deve possuir no mínimo 1 caractere"),
    content: z
      .string({
        required_error: "'name' é obrigatório",
        invalid_type_error: "'name' deve ser do tipo string",
      })
      .min(2, "'name' deve possuir no mínimo 2 caracteres"),
  })
  .transform((data) => data as CreatePostInputDTO);
