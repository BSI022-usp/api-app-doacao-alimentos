import { Module } from '@nestjs/common';
import { ArrecadacaoService } from './arrecadacao.service';
import { ArrecadacaoController } from './arrecadacao.controller';
import { Arrecadacao } from './entities/arrecadacao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Arrecadacao])],
  controllers: [ArrecadacaoController],
  providers: [ArrecadacaoService],
})
export class ArrecadacaoModule {}
