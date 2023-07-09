import z from "zod";
import { TUserDB } from "../../models/types";

export interface UserLoginInputDTO {
  email: string;
  password: string;
}

export interface UserLoginOutputDTO {
  message: string;
  user: TUserDB
}

export const UserLoginSchema = z
  .object({
    email: z
      .string({
        required_error: "'email' é obrigatório",
        invalid_type_error: "'email' deve ser do tipo string",
      })
      .email("'email' inválido"),
    password: z
      .string({
        required_error: "'password' é obrigatório",
        invalid_type_error: "'password' deve ser do tipo string",
      })
      .min(4, "'password' deve possuir no mínimo 4 caracteres"),
  })
  .transform((data) => data as UserLoginInputDTO);