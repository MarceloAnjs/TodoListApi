import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "../entities/usuario.entity";
import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto implements Usuario {
    @ApiProperty()
    @IsString()
    Nome: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    Email: string;
    
    @ApiProperty()
    @IsString()
    Senha: string;
}
