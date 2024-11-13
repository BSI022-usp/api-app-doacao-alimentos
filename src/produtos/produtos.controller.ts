import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutosNew } from './entities/produto.entity';

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
  async findOne(@Param('gtin') gtin: string) {
    const response = await this.produtosService.findProdutoByCode(gtin);

    if (!response) throw new NotFoundException('Produto não encontrado');
    else return response;
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
