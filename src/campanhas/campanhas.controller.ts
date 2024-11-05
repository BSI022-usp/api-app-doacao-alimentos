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

@Controller('campanhas')
export class CampanhasController {
  constructor(
    private readonly campanhasService: CampanhasService,
    private readonly arrecadacaoService: ArrecadacaoService,
  ) {}

  // @Post()
  // create(@Body() createCampanhaDto: CreateCampanhaDto) {
  //   return this.campanhasService.create(createCampanhaDto);
  // }

  @Get()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campanhasService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCampanhaDto: UpdateCampanhaDto) {
  //   return this.campanhasService.update(+id, updateCampanhaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campanhasService.remove(+id)
  }

  
}
