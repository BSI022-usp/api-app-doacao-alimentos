import { Injectable } from '@nestjs/common'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProdutosNew } from './entities/produto.entity'

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutosNew)
    private produtoRepository: Repository<ProdutosNew>
  ) {}

  // create(createProdutoDto: CreateProdutoDto) {
  //   return 'This action adds a new produto';
  // }

  async find10Produtos() {
    return await this.produtoRepository.find({ take: 10 })
  }

  async findProdutoByCode(gtin: string) {
    return await this.produtoRepository.findOneBy({ gtin })
  }

  // update(id: number, updateProdutoDto: UpdateProdutoDto) {
  //   return `This action updates a #${id} produto`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} produto`;
  // }
}
