import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.createOrUpdate(createProdutoDto);
  }

  @Get()
  findAllProducts() {
    return this.produtosService.findAllProducts();
  }

  @Get(':gtin')
  findOne(@Param('gtin') gtin: string) {
    return this.produtosService.findProdutoByCode(gtin);
  }

  @Get('/categorias/:category')
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
