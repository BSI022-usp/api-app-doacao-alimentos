import { Injectable } from '@nestjs/common';
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto';
import { UpdateArrecadacaoDto } from './dto/update-arrecadacao.dto';
import { Arrecadacao } from './entities/arrecadacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArrecadacaoService {
  constructor(
    @InjectRepository(Arrecadacao)
    private arrecadacaoRepository: Repository<Arrecadacao>,
  ) {}

  create(createArrecadacaoDto: CreateArrecadacaoDto) {
    return 'This action adds a new arrecadacao';
  }

  async findAll() {
    return await this.arrecadacaoRepository.find({ take: 10 });
  }

  findOne(id: number) {
    return `This action returns a #${id} arrecadacao`;
  }

  update(id: number, updateArrecadacaoDto: UpdateArrecadacaoDto) {
    return `This action updates a #${id} arrecadacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} arrecadacao`;
  }

  //pega todas as arrecadações de uma determinada campanha
  async arrecadacoesPorCampanha(idCampanha: number){
    return this.arrecadacaoRepository.findBy({id_campanha: idCampanha})
  }
}
