import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marcas } from './entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marcas) private marcaRepository: Repository<Marcas>,
  ) {}

  async findAll(): Promise<Marcas[]> {
    return await this.marcaRepository.find({ take: 50 });
  }

  // async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
  //   return 'This action adds a new marca';
  // }

  async findById(id: number) {
    return await this.marcaRepository.findOneBy({ id });
  }

  // update(id: number, updateMarcaDto: UpdateMarcaDto) {
  //   return `This action updates a #${id} marca`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} marca`;
  // }
}
