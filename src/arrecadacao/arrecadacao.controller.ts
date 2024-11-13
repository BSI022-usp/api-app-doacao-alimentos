import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArrecadacaoService } from './arrecadacao.service';
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto';
import { UpdateArrecadacaoDto } from './dto/update-arrecadacao.dto';

@Controller('arrecadacao')
export class ArrecadacaoController {
  constructor(private readonly arrecadacaoService: ArrecadacaoService) {}

  @Post()
  create(@Body() createArrecadacaoDto: CreateArrecadacaoDto) {
    return this.arrecadacaoService.createOrUpdate(createArrecadacaoDto);
  }

  @Get()
  findAll() {
    return this.arrecadacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arrecadacaoService.findOne(+id);
  }

  //rota que retorna todas as arrecadacoes de uma campanha
  //@Get('campanha/:idCampanha')
  //arrecadacoesPorCampanha(@Param('idCampanha') id: string) {
  //  return this.arrecadacaoService.arrecadacoesPorCampanha(+id)
  //}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArrecadacaoDto: UpdateArrecadacaoDto,
  ) {
    return this.arrecadacaoService.update(+id, updateArrecadacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arrecadacaoService.remove(+id);
  }
}
