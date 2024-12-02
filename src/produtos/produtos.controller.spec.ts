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
      {
        gtin: '7891167021105',
        id_produto_categoria: 'Arroz',
        codigo_ncm: '03035300',
        medida_por_embalagem: null,
        produto_medida_sigla: null,
        produto_marca: 'NÃO INFORMADO',
        nome: 'Sardinha Com Ã“leo Defumado Gomes Da Costa Lata 84g',
        nome_sem_acento: 'Sardinha Com oleo Defumado Gomes Da Costa Lata 84g',
      } as unknown as ProdutosNew,
      {
        gtin: '7891167099432',
        id_produto_categoria: null,
        codigo_ncm: '03035300',
        medida_por_embalagem: null,
        produto_medida_sigla: null,
        produto_marca: 'NÃO INFORMADO',
        nome: 'Sardinha Com Ã“leo Gomes Da Costa Lata 420g Leve 5 Pague 4 Unidades',
        nome_sem_acento:
          'Sardinha Com oleo Gomes Da Costa Lata 420g Leve 5 Pague 4 Unidades',
      } as unknown as ProdutosNew,
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

  it('create - should return product created by service', async () => {
    const produtoMock: ProdutosNew = {
      id: 1,
      nome: 'Produto 1',
      id_produto_categoria: 'teste',
    } as unknown as ProdutosNew

    jest.spyOn(service, 'createOrUpdate').mockResolvedValue(produtoMock)

    const result = await controller.create(produtoMock)
    expect(result).toEqual(produtoMock)
  })

  it('find products by gtin - should return all products filter by gtin', async () => {
    const produtosMock: ProdutosNew = {
      id: 1,
      nome: 'Produto 1',
      id_produto_categoria: 'teste',
    } as unknown as ProdutosNew

    jest.spyOn(service, 'findProdutoByCode').mockResolvedValue(produtosMock)

    const result = await controller.findOne('teste')
    expect(result).toEqual(produtosMock)
  })
})
