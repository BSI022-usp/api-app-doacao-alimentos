
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.createOrUpdate(createProdutoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os produtos',
    description: 'Retorna uma lista completa com todos os produtos cadastrados no sistema.',
  })
  findAllProducts() {
    return this.produtosService.findAllProducts();
  }

  @Get(':gtin')
  @ApiOperation({
    summary: 'Busca um produto pelo GTIN',
    description: 'Procura e retorna os detalhes de um produto específico com base no GTIN (Global Trade Item Number) fornecido como parâmetro.',
  })
  findOne(@Param('gtin') gtin: string) {
    return this.produtosService.findProdutoByCode(gtin);
  }

  @Get('/categorias/:category')
  @ApiOperation({
    summary: 'Busca produtos por categoria',
    description: 'Retorna uma lista de produtos que pertencem à categoria especificada no parâmetro.',
  })
  findByCategory(@Param('category') category: string) {
    return this.produtosService.findProductsByCategory(category);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
  //   return this.produtosService.update(+id, updateProdutoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.produtosService.remove(+id);
  // }
}
