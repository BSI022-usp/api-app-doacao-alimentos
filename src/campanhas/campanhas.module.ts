import { Module } from '@nestjs/common'
import { CampanhasService } from './campanhas.service'
import { CampanhasController } from './campanhas.controller'
import { Campanhas } from './entities/campanhas.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArrecadacaoService } from 'src/arrecadacao/arrecadacao.service'
import { Arrecadacao } from 'src/arrecadacao/entities/arrecadacao.entity'
import { ProdutosNew } from 'src/produtos/entities/produto.entity'
import { Categorias } from 'src/categorias/entities/categorias.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Campanhas]), TypeOrmModule.forFeature([Arrecadacao]), TypeOrmModule.forFeature([ProdutosNew]), TypeOrmModule.forFeature([Categorias])],
  controllers: [CampanhasController],
  providers: [CampanhasService, ArrecadacaoService],
})
export class CampanhasModule {}
