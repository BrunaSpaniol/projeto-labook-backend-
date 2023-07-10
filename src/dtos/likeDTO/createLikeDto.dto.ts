import z from "zod";

const like = z.enum(["true", "false"]);

export interface CreateLikeInputDTO {
  postId: string;
  like: z.infer<typeof like>;
  token: string;
}

export interface CreateLikeOutputDTO {
  message: string;
}

export const CreateLikeSchema = z
  .object({
    postId: z
      .string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string",
      })
      .min(1, "'id' deve possuir no mínimo 1 caractere"),
    like: z
      .string({
        required_error: "'like' é obrigatório",
        invalid_type_error: "'like' deve ser do tipo string",
      })
      .min(2, "'name' deve possuir no mínimo 2 caracteres"),
    token: z.string().min(1),
  })
  .transform((data) => data as CreateLikeInputDTO);
