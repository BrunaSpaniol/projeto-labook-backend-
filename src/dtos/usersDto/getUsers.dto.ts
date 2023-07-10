import z from "zod";
import { UserModel } from "../../models";

export interface GetUsersInputDTO {
  token: string; // adicionamos a propriedade token no dto de entrada
}

// UserModel é a estrutura de User que será devolvida para o Front (sem password)
export type GetUsersOutputDTO = UserModel[];

export const GetUsersSchema = z
  .object({
    q: z.string().min(1).optional(),
    token: z.string().min(1), // adicionamos token também no schema
  })
  .transform((data) => data as GetUsersInputDTO);
