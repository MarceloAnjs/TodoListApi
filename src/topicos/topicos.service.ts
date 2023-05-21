import { Injectable } from '@nestjs/common';
import { CreateTopicoDto } from './dto/create-topico.dto';
import { UpdateTopicoDto } from './dto/update-topico.dto';
import { DatabaseConfig } from 'src/sqlConfig';
var mysql = require('mysql2');

@Injectable()
export class TopicosService {
  constructor(private readonly databaseConfig: DatabaseConfig) {}

  async create(createTopicoDto: CreateTopicoDto) {
    const connection = mysql.createConnection(this.databaseConfig.getConfig());

    
    if (!createTopicoDto.Nome || !createTopicoDto.idUsuario) {
      return {
        statusCode: 400,
        message: 'Campos obrigatórios faltando para o cadastro!',
      };
    }

    try {
      const queryUsuario = 'SELECT * FROM Usuarios WHERE idUsuario = ? AND Ativo = 1';

      let [rows, fields] = await connection.promise().query(queryUsuario, [createTopicoDto.idUsuario]);
      if (rows.length === 0) {
        return {
          statusCode: 404,
          message: 'Usuário não encontrado, impossível finalizar o cadastro do tópico.',
        };
      }

      const query = 'INSERT INTO Topico (Nome, idUsuario) VALUES (?, ?)';
      
      await new Promise((resolve, reject) => {
        connection.query(
          query,
          [createTopicoDto.Nome, createTopicoDto.idUsuario],

          function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          },
        );
      });
      return {
        statusCode: 201,
        message: 'Topico cadastrado com sucesso!',
      };
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  findAll() {
    return `This action returns all topicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topico`;
  }

  update(id: number, updateTopicoDto: UpdateTopicoDto) {
    return `This action updates a #${id} topico`;
  }

  remove(id: number) {
    return `This action removes a #${id} topico`;
  }
}
