import { Injectable } from '@nestjs/common'
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto'
import { UpdateArrecadacaoDto } from './dto/update-arrecadacao.dto'
import { Arrecadacao } from './entities/arrecadacao.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ArrecadacaoService {
  constructor(
    @InjectRepository(Arrecadacao)
    private arrecadacaoRepository: Repository<Arrecadacao>
  ) {}

  async createOrUpdate(createArrecadacaoDto: CreateArrecadacaoDto) {
    const productOnDatabase: Arrecadacao =
      await this.arrecadacaoRepository.findOneBy({
        id_campanha: createArrecadacaoDto.id_campanha,
        id_produto: createArrecadacaoDto.id_produto,
      })

    if (productOnDatabase)
      createArrecadacaoDto.qtd_total += productOnDatabase.qtd_total

    return await this.arrecadacaoRepository.save(createArrecadacaoDto)
  }

  async findAll() {
    return await this.arrecadacaoRepository.find({ take: 10 })
  }

  findOne(id: number) {
    return `This action returns a #${id} arrecadacao`
  }

  update(id: number, updateArrecadacaoDto: UpdateArrecadacaoDto) {
    return `This action updates a #${id} arrecadacao`
  }

  remove(id: number) {
    return `This action removes a #${id} arrecadacao`
  }

  //pega todas as arrecadações de uma determinada campanha
  async arrecadacoesPorCampanha(idCampanha: number) {
    return this.arrecadacaoRepository.findBy({ id_campanha: idCampanha })
  }
}
