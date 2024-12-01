import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { CampanhasService } from './campanhas.service'
import { ArrecadacaoService } from '../arrecadacao/arrecadacao.service'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { ApiOperation } from '@nestjs/swagger'

// TODO uma arrecadacao só pode ser feita em uma campanha que esteja em andamento
@Controller('campanhas')
export class CampanhasController {
  constructor(
    private readonly campanhasService: CampanhasService,
    private readonly arrecadacaoService: ArrecadacaoService
  ) {}

  @Get(':idCampanha/resumo')
  @ApiOperation({
    summary: 'Busca arrecadações agrupadas por categoria de uma campanha',
    description:
      'Retorna relatório de arrecadações agrupados por categoria de uma campanha específica com base no ID fornecido.',
  })
  async testeNovoEndpoint(@Param('idCampanha') idCampanha: number) {
    return await this.campanhasService.getCollectionFromAllCategoriesByCampaignId(
      idCampanha
    )
  }

  @Get(':idCampanha/collection')
  @ApiOperation({
    summary: 'Busca arrecadações e produtos de uma campanha específica',
    description:
      'Retorna todas as arrecadações e produtos de uma campanha específica com base no ID fornecido.',
  })
  async getCollectionByCampaignId(@Param('idCampanha') idCampanha: number) {
    return this.campanhasService.getCollectionByCampaignId(idCampanha)
  }
  // @Param('idCampanha') idCampanha: number,
  //     @Param('nomeCategoria') nomeCategoria: string
  @Post('')
  @ApiOperation({
    summary: 'Cria uma nova campanha',
    description:
      'Recebe os dados necessários de uma campanha e a adiciona ao sistema.',
  })
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhasService.create(createCampanhaDto)
  }

  @Patch('close/:idCampanha')
  @ApiOperation({
    summary: 'Finaliza uma campanha',
    description: 'Atualiza o campo data_fim de null para a data atual.',
  })
  async closeCurrentCampanha(@Param('idCampanha') id: number) {
    return this.campanhasService.updateDataFim(id)
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todas as campanhas com arrecadações',
    description:
      'Retorna uma lista de todas as campanhas cadastradas no sistema, com suas respectivas arrecadações',
  })
  async findAll() {
    const campanhas = await this.campanhasService.findAll()

    const campanhasComArrecadacoes = await Promise.all(
      campanhas.map(async (campanha) => {
        const arrecadacoes =
          await this.arrecadacaoService.arrecadacoesPorCampanha(campanha.id)
        return { ...campanha, arrecadacoes }
      })
    )

    return campanhasComArrecadacoes
  }

  @Get('/in-progress')
  @ApiOperation({
    summary: 'Lista campanhas em andamento',
    description:
      'Retorna uma lista de campanhas que estão em andamento no momento.',
  })
  async findInProgress() {
    return await this.campanhasService.findInProgress()
  }

  @Get(':idCampanha')
  @ApiOperation({
    summary: 'Busca arrecadações de uma campanha específica',
    description:
      'Retorna todas as arrecadações de uma campanha específica com base no ID fornecido.',
  })
  findOne(@Param('idCampanha') id: string) {
    return this.arrecadacaoService.arrecadacoesPorCampanha(+id)
  }

  //   @Get(':idCampanha/resumo')
  //   @ApiOperation({
  //     summary:
  //       'Busca a quantidade total de arrecadações da campanha, por categoria',
  //     description:
  //       'Retorna o nome das categorias seguido da quantidade total arrecadada, em kg ou L',
  //   })
  //   async getResumoByCampanhaId(@Param('idCampanha') idCampanha: number) {
  //     return this.campanhasService.getResumoByCampanhaId(idCampanha)
  //   }

  @Get(':idCampanha/resumo/:nomeCategoria')
  @ApiOperation({
    summary: 'Busca o resumo de determinada categoria de uma campanha',
    description:
      'Retorna a quantidade de pacotes e seus respectivos pesos, de determinada categoria de uma campanha',
  })
  async getEstatisticas(
    @Param('idCampanha') idCampanha: number,
    @Param('nomeCategoria') nomeCategoria: string
  ) {
    return await this.campanhasService.getEstatisticas(
      idCampanha,
      nomeCategoria
    )
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
    description:
      'Deleta uma campanha específica com base no ID fornecido. Esta operação não pode ser desfeita.',
  })
  remove(@Param('id') id: string) {
    return this.campanhasService.remove(+id)
  }
}
