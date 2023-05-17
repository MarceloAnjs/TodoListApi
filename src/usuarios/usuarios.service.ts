import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { encodePassword, comparePassword } from 'src/utils/bcrypt';
import { DatabaseConfig } from 'src/sqlConfig';
var mysql = require('mysql2');

@Injectable()
export class UsuariosService {
  constructor(private readonly databaseConfig: DatabaseConfig) {}
  
  async cadastro(createUsuarioDto: CreateUsuarioDto) {
    const connection = mysql.createConnection(this.databaseConfig.getConfig());

    const dadosUsuario = {
      Nome: createUsuarioDto.Nome,
      Email: createUsuarioDto.Email, 
      Senha: await encodePassword(createUsuarioDto.Senha) 
    };
 
  
    try {
      await new Promise((resolve, reject) => {
        connection.query('INSERT INTO Usuarios (Nome, Email, Senha) VALUES (?, ?, ?)', [dadosUsuario.Nome, dadosUsuario.Email, dadosUsuario.Senha], function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      return {
        statusCode: 201,
        message: 'Usuário cadastrado com sucesso!'
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return {
          statusCode: 409,
          message: 'Usuário já cadastrado!'
        }
      }
      throw error;
    }
  } 

  async login(email: string, senha: string) {
    let connection = await mysql.createConnection(this.databaseConfig.getConfig());
    let dadosUsuario = {
      Email: email,
      Senha: senha,
    };


    try {
      let [rows, fields] = await connection.promise().query('SELECT * FROM Usuarios WHERE Email = ? AND Ativo = 1', [dadosUsuario.Email]);
      console.log(rows)
      if (rows.length === 0) {
        return {
          statusCode: 404,
          message: 'Usuário não encontrado!'
        }
      }
      let usuario = rows[0];
      let senhaValida = await comparePassword(dadosUsuario.Senha, usuario.Senha);
      if (!senhaValida) {
        return {
          statusCode: 401,
          message: 'Senha inválida!'
        }
      }
      return {
        statusCode: 200,
        message: 'Login efetuado com sucesso!'
      }
    } catch (error) {}
      
  }

  findOne() {

  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
