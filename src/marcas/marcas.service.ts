import { Injectable } from '@nestjs/common'
import { CreateMarcaDto } from './dto/create-marca.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MarcasNew } from './entities/marca.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(MarcasNew)
    private marcaRepository: Repository<MarcasNew>
  ) {}

  async findAll(): Promise<MarcasNew[]> {
    return await this.marcaRepository.find()
  }

  async create(createMarcaDto: CreateMarcaDto): Promise<MarcasNew> {
    const marca = this.marcaRepository.create(createMarcaDto)
    return await this.marcaRepository.save(marca)
  }

  async findMarcaByName(nome: string) {
    return await this.marcaRepository.findOneBy({ nome })
  }
}
