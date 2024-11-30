import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CategoriasService } from './categorias.service'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova categoria',
    description:
      'Recebe os dados de uma nova categoria e a adiciona ao sistema.',
  })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as categorias',
    description:
      'Retorna uma lista com todas as categorias cadastradas no sistema.',
  })
  findAll() {
    return this.categoriasService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca uma categoria específica',
    description:
      'Retorna os detalhes de uma categoria com base no ID fornecido.',
  })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de uma categoria',
    description:
      'Modifica as informações de uma categoria existente com base no ID fornecido.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto
  ) {
    return this.categoriasService.update(+id, updateCategoriaDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma categoria',
    description:
      'Deleta uma categoria específica com base no ID fornecido. Esta operação não pode ser desfeita.',
  })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id)
  }
}
