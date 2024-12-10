import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProdutosNew } from './entities/produto.entity'
import { CreateProdutoDto } from './dto/create-produto.dto'

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutosNew)
    private produtoRepository: Repository<ProdutosNew>
  ) {}

  async createOrUpdate(createProdutoDto: CreateProdutoDto) {
    return await this.produtoRepository.save(createProdutoDto)
  }

  async findAllProducts() {
    return await this.produtoRepository.query('SELECT * FROM PRODUTOS_NEW')
  }

  async findProdutoByCode(gtin: string) {
    const product = await this.produtoRepository.findOneBy({ gtin })

    if (!product) {
      throw new NotFoundException('Produto não encontrado.')
    }
    return product
  }

  async findProductsByCategory(category: string) {
    return await this.produtoRepository.find({
      where: {
        id_produto_categoria: category,
      },
      order: {
        nome_sem_acento: 'ASC',
      },
    })
  }

  // update(id: number, updateProdutoDto: UpdateProdutoDto) {
  //   return `This action updates a #${id} produto`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} produto`;
  // }
}
