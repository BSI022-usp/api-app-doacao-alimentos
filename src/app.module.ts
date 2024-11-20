import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MarcasModule } from './marcas/marcas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CampanhasModule } from './campanhas/campanhas.module';
import { ArrecadacaoModule } from './arrecadacao/arrecadacao.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MarcasModule,
    ProdutosModule,
    CampanhasModule,
    ArrecadacaoModule,
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
