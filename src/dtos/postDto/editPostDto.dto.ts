import z from "zod";

export interface EditPostInputDTO {
  id: string;
  creator_id: string;
  content: string;
}

export interface EditPostOutputDTO {
  message: string;
}

export const EditPostSchema = z
  .object({
    id: z
      .string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string",
      })
      .min(1, "'id' deve possuir no mínimo 1 caractere"),
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
  .transform((data) => data as EditPostInputDTO);
