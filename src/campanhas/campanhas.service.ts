import { Injectable } from '@nestjs/common'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { UpdateCampanhaDto } from './dto/update-campanha.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Campanhas } from './entities/campanhas.entity'
import { Repository } from 'typeorm'
import { IsNull } from 'typeorm'

@Injectable()
export class CampanhasService {
  constructor(
    @InjectRepository(Campanhas)
    private campanhaRepository: Repository<Campanhas>
  ) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanhas> {
    const newCampanha = this.campanhaRepository.create(createCampanhaDto)
    return await this.campanhaRepository.save(newCampanha)
  }
  //pegar todas as campanhas
  async findAll() {
    return await this.campanhaRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} campanha`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCampanhaDto: UpdateCampanhaDto) {
    return `This action updates a #${id} campanha`
  }

  remove(id: number) {
    return `This action removes a #${id} campanha`
  }

  async findInProgress() {
    const campanhasInProgress = await this.campanhaRepository.find({
      where: {
        data_fim: IsNull(),
      },
      order: {
        data_inicio: 'DESC',
      },
    })
    return campanhasInProgress
  }
}
