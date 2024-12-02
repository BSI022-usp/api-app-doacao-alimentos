import { Injectable } from '@nestjs/common'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
// import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { Categorias } from './entities/categorias.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias)
    private readonly categoriaRepository: Repository<Categorias>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaRepository.save(createCategoriaDto)
  }

  async findAll() {
    const result = await this.categoriaRepository.find({
      order: {
        nome_categoria: 'ASC',
      },
    })
    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`
  }

  update(id: number) {
    return `This action updates a #${id} categoria`
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`
  }
}
