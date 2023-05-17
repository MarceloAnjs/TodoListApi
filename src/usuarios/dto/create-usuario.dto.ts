import { Usuario } from "../entities/usuario.entity";

export class CreateUsuarioDto implements Usuario {
    Nome: string;
    Email: string;
    Senha: string;
}
