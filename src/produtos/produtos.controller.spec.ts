import { ProdutosController } from './produtos.controller'
import { ProdutosService } from './produtos.service'
import { Repository } from 'typeorm'
import { ProdutosNew } from './entities/produto.entity'

describe('ProdutosController', () => {
  let controller: ProdutosController
  let service: ProdutosService
  let repository: Repository<ProdutosNew>

  beforeAll(() => {
    repository = {} as Repository<ProdutosNew>
    service = new ProdutosService(repository)
    controller = new ProdutosController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('find all products - should return all products', async () => {
    const produtosMock: ProdutosNew[] = [
      { id: 1, nome: 'Produto 1' } as unknown as ProdutosNew,
      { id: 2, nome: 'Produto 2' } as unknown as ProdutosNew,
    ]

    jest.spyOn(service, 'findAllProducts').mockResolvedValue(produtosMock)

    const result = await controller.findAllProducts()
    expect(result).toEqual(produtosMock)
  })

  it('find products by category - should return all products filter by category', async () => {
    const produtosMock: ProdutosNew[] = [
      {
        id: 1,
        nome: 'Produto 1',
        id_produto_categoria: 'teste',
      } as unknown as ProdutosNew,
      {
        id: 2,
        nome: 'Produto 2',
        id_produto_categoria: 'teste',
      } as unknown as ProdutosNew,
    ]

    jest
      .spyOn(service, 'findProductsByCategory')
      .mockResolvedValue(produtosMock)

    const result = await controller.findByCategory('teste')
    expect(result).toEqual(produtosMock)
  })
})
