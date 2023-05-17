import { Usuario } from "../entities/usuario.entity";

export class CreateUsuarioDto implements Usuario {
    idUsuario: number;
    Nome: string;
    Email: string;
    Senha: string;
}
