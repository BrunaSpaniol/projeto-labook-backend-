import z from "zod";

export interface DeletePostInputDTO {
  id: string;
  creator_id: string;
}

export interface DeletePostOutputDTO {
  message: string;
}

export const DeletePostSchema = z
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
  })
  .transform((data) => data as DeletePostInputDTO);
