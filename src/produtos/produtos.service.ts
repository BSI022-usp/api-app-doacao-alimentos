import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutosNew } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutosNew)
    private produtoRepository: Repository<ProdutosNew>,
  ) {}

  // create(createProdutoDto: CreateProdutoDto) {
  //   return 'This action adds a new produto';
  // }

  async findAllProducts() {
    return await this.produtoRepository.query('SELECT * FROM PRODUTOS_NEW');
  }

  async findProdutoByCode(gtin: string) {
    return await this.produtoRepository.findOneBy({ gtin });
  }

  // update(id: number, updateProdutoDto: UpdateProdutoDto) {
  //   return `This action updates a #${id} produto`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} produto`;
  // }
}
