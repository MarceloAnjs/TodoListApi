import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TopicosModule } from './topicos/topicos.module';

@Module({
  imports: [UsuariosModule, ConfigModule.forRoot({
    isGlobal: true
  }), TopicosModule],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
