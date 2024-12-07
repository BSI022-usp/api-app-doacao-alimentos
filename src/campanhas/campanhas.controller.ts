import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CampanhasService } from './campanhas.service'
import { ArrecadacaoService } from '../arrecadacao/arrecadacao.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('campanhas')
export class CampanhasController {
  constructor(
    private readonly campanhasService: CampanhasService,
    private readonly arrecadacaoService: ArrecadacaoService,
  ) {}

  @Post('')
  @ApiOperation({
    summary: 'Cria uma nova campanha',
    description: 'Recebe os dados necessários de uma campanha e a adiciona ao sistema.',
  })
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhasService.create(createCampanhaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as campanhas com arrecadações',
    description: 'Retorna uma lista de todas as campanhas cadastradas no sistema, com suas respectivas arrecadações',
  })
  async findAll() {
    const campanhas = await this.campanhasService.findAll();

    const campanhasComArrecadacoes = await Promise.all(
      campanhas.map(async (campanha) => {
        const arrecadacoes = await this.arrecadacaoService.arrecadacoesPorCampanha(campanha.id);
        return { ...campanha, arrecadacoes };
      }),
    );

    return campanhasComArrecadacoes;
  }

  @Get(':idCampanha')
  @ApiOperation({
    summary: 'Busca arrecadações de uma campanha específica',
    description: 'Retorna todas as arrecadações de uma campanha específica com base no ID fornecido.',
  })
  findOne(@Param('idCampanha') id: string) {
    return this.arrecadacaoService.arrecadacoesPorCampanha(+id);
  }

  @Get(':idCampanha/estatisticas')
  @ApiOperation({
    summary: 'Busca a quantidade total de alimentos arrecadados na campanha, por categoria de alimento',
    description: 'Retorna o nome das categorias seguido da quantidade total arrecadada, em kg ou L',
  })
  async getEstatisticasGerais(@Param('idCampanha') idCampanha: number) {
    return this.campanhasService.getEstatisticasGerais(idCampanha);
  }

  @Get(':idCampanha/estatisticas/:nomeCategoria')
  @ApiOperation({
    summary: 'Busca a quantidade e peso dos pacotes arrecadados de determinada categoria de uma campanha',
    description: 'Retorna a quantidade de pacotes e seus respectivos pesos, de determinada categoria de uma campanha',
  })
  async getEstatisticas(
    @Param('idCampanha') idCampanha: number,
    @Param('nomeCategoria') nomeCategoria: string,
  ) {
    return await this.campanhasService.getEstatisticas(idCampanha, nomeCategoria);
  }

  


  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Atualiza os dados de uma campanha',
  //   description: 'Permite modificar as informações de uma campanha existente com base no ID fornecido.',
  // })
  // update(@Param('id') id: string, @Body() updateCampanhaDto: UpdateCampanhaDto) {
  //   return this.campanhasService.update(+id, updateCampanhaDto);
  // }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma campanha',
    description: 'Deleta uma campanha específica com base no ID fornecido. Esta operação não pode ser desfeita.',
  })
  remove(@Param('id') id: string) {
    return this.campanhasService.remove(+id);
  }

  
}
