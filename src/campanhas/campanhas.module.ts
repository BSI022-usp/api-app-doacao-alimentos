import { Module } from '@nestjs/common'
import { CampanhasService } from './campanhas.service'
import { CampanhasController } from './campanhas.controller'
import { Campanhas } from './entities/campanhas.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArrecadacaoService } from 'src/arrecadacao/arrecadacao.service'
import { Arrecadacao } from 'src/arrecadacao/entities/arrecadacao.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Campanhas]), TypeOrmModule.forFeature([Arrecadacao])],
  controllers: [CampanhasController],
  providers: [CampanhasService, ArrecadacaoService],
})
export class CampanhasModule {}
