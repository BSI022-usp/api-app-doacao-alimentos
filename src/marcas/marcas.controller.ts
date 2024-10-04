import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marcas } from './entities/marca.entity';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  // @Post()
  // create(@Body() createMarcaDto: CreateMarcaDto) {
  //   return this.marcasService.create(createMarcaDto);
  // }

  @Get()
  async findAll(): Promise<Marcas[]> {
    const marcas = await this.marcasService.findAll();
    return marcas;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marcasService.findById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
  //   return this.marcasService.update(+id, updateMarcaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.marcasService.remove(+id);
  // }
}
