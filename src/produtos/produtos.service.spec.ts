import { ProdutosService } from './produtos.service'
import { ProdutosNew } from './entities/produto.entity'
import { Repository } from 'typeorm/repository/Repository'

const mockRepository = {
  query: jest
    .fn()
    .mockReturnValueOnce(Promise.resolve([{ categoria: 'Arroz' }]))
    .mockReturnValueOnce(Promise.resolve([{}])),
}

describe('ProdutosService', () => {
  let service: ProdutosService
  let repository: Repository<ProdutosNew>

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<ProdutosNew>
    service = new ProdutosService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Find All Products - should get a list of products', async () => {
    const result = await service.findAllProducts()
    expect(result).toBeInstanceOf(Array)
    expect(result[0].categoria).toBe('Arroz')
  })

  it('Find All Products - should get empty result if has no products in database', async () => {
    const result = await service.findAllProducts()
    expect(result).toStrictEqual([{}])
  })
})
