import { Injectable } from '@nestjs/common'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { Categorias } from './entities/categorias.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias)
    private categoriaRepository: Repository<Categorias>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaRepository.save(createCategoriaDto)
  }

  async findAll() {
    return await this.categoriaRepository.find({ take: 10 })
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`
  }
}
