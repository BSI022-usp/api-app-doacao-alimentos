import {
  Controller,
  Get,
  Post,
  Body,
  //   Patch,
  Param,
  //   Delete,
} from '@nestjs/common'
import { MarcasService } from './marcas.service'
import { CreateMarcaDto } from './dto/create-marca.dto'
// import { UpdateMarcaDto } from './dto/update-marca.dto'
import { MarcasNew } from './entities/marca.entity'
import { ApiOperation } from '@nestjs/swagger'

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova marca',
    description: 'Recebe o nome de uma marca e a adiciona ao sistema.',
  })
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as marcas',
    description:
      'Retorna uma lista completa com todas as marcas cadastradas no sistema.',
  })
  async findAll(): Promise<MarcasNew[]> {
    const marcas = await this.marcasService.findAll()
    return marcas
  }

  @Get(':nome')
  @ApiOperation({
    summary: 'Busca uma marca pelo nome',
    description:
      'Procura e retorna os detalhes de uma marca específica com base no nome fornecido como parâmetro.',
  })
  findOne(@Param('nome') nome: string) {
    return this.marcasService.findMarcaByName(nome)
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
