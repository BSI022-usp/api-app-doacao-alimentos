import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ArrecadacaoService } from './arrecadacao.service'
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto'
import { UpdateArrecadacaoDto } from './dto/update-arrecadacao.dto'
import { ApiOperation } from '@nestjs/swagger';

@Controller('arrecadacao')
export class ArrecadacaoController {
  constructor(private readonly arrecadacaoService: ArrecadacaoService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova arrecadação',
    description: 'Recebe os dados de uma arrecadação e a adiciona ao sistema. Os dados devem seguir o formato definido pelo DTO.',
  })
  create(@Body() createArrecadacaoDto: CreateArrecadacaoDto) {
    return this.arrecadacaoService.createOrUpdate(createArrecadacaoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as arrecadações',
    description: 'Retorna uma lista completa com todas as arrecadações cadastradas no sistema.',
  })
  findAll() {
    return this.arrecadacaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca uma arrecadação específica',
    description: 'Retorna os detalhes de uma arrecadação com base no ID fornecido.',
  })
  findOne(@Param('id') id: string) {
    return this.arrecadacaoService.findOne(+id);
  }

  // @Get('campanha/:idCampanha')
  // @ApiOperation({
  //   summary: 'Busca arrecadações de uma campanha',
  //   description: 'Retorna todas as arrecadações relacionadas a uma campanha específica com base no ID fornecido.',
  // })
  // arrecadacoesPorCampanha(@Param('idCampanha') id: string) {
  //   return this.arrecadacaoService.arrecadacoesPorCampanha(+id);
  // }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de uma arrecadação',
    description: 'Modifica as informações de uma arrecadação existente com base no ID fornecido. Os dados devem seguir o formato definido pelo DTO.',
  })
  update(
    @Param('id') id: string,
    @Body() updateArrecadacaoDto: UpdateArrecadacaoDto,
  ) {
    return this.arrecadacaoService.update(+id, updateArrecadacaoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma arrecadação',
    description: 'Deleta uma arrecadação específica com base no ID fornecido. Esta operação não pode ser desfeita.',
  })
  remove(@Param('id') id: string) {
    return this.arrecadacaoService.remove(+id);
  }
}
