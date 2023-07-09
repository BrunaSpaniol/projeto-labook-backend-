import { BaseError } from "./BaseError";

export class UnauthorazedError extends BaseError {
    constructor(
        message: string = "Vocẽ não tem autorização para acessar esse dado" // mensagem de erro padrão caso não seja enviado um argumento
    ) {
        super(401, message)
    }
}