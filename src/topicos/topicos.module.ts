import { Module } from '@nestjs/common';
import { TopicosService } from './topicos.service';
import { TopicosController } from './topicos.controller';
import { DatabaseConfig } from 'src/sqlConfig';

@Module({
  controllers: [TopicosController],
  providers: [TopicosService, DatabaseConfig]
})
export class TopicosModule {}
