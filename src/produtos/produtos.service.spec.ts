import { ProdutosService } from './produtos.service';
import { ProdutosNew } from './entities/produto.entity';
import { Repository } from 'typeorm/repository/Repository';

const arrayProducts = [
  {
    gtin: '7891167021105',
    id_produto_categoria: 'Arroz',
    codigo_ncm: '03035300',
    medida_por_embalagem: null,
    produto_medida_sigla: null,
    produto_marca: 'NÃO INFORMADO',
    nome: 'Sardinha Com Ã“leo Defumado Gomes Da Costa Lata 84g',
    nome_sem_acento: 'Sardinha Com oleo Defumado Gomes Da Costa Lata 84g',
  },
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
  },
];

const mockRepository = {
  query: jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(arrayProducts))
    .mockReturnValueOnce(Promise.resolve([{}])),
  find: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve([{ nome: 'comida', id_produto_categoria: 'teste' }]),
    )
    .mockReturnValueOnce(Promise.resolve([{}])),
  findOneBy: jest.fn().mockReturnValueOnce(
    Promise.resolve({
      gtin: '789100003455',
      nome: 'comida',
      id_produto_categoria: 'teste',
    }),
  ),
  save: jest.fn().mockReturnValueOnce(Promise.resolve(arrayProducts[0])),
};

describe('ProdutosService', () => {
  let service: ProdutosService;
  let repository: Repository<ProdutosNew>;

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<ProdutosNew>;
    service = new ProdutosService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Find All Products - should get a list of products', async () => {
    const result = await service.findAllProducts();
    expect(result).toBeInstanceOf(Array);
    expect(result[0].id_produto_categoria).toBe('Arroz');
    expect(result[0].codigo_ncm).toBe('03035300');
    expect(result[0].gtin).toBe('7891167021105');
    expect(result[0].nome_sem_acento).toBe(
      'Sardinha Com oleo Defumado Gomes Da Costa Lata 84g',
    );
    expect(result[1].id_produto_categoria).toBe(null);
    expect(result[1].codigo_ncm).toBe('03035300');
    expect(result[1].gtin).toBe('7891167099432');
    expect(result[1].nome_sem_acento).toBe(
      'Sardinha Com oleo Gomes Da Costa Lata 420g Leve 5 Pague 4 Unidades',
    );
  });

  it('Find All Products - should get empty result if has no products in database', async () => {
    const result = await service.findAllProducts();
    expect(result).toStrictEqual([{}]);
  });

  it('Find Products By Category - should get a list of products with one category', async () => {
    const result = await service.findProductsByCategory('teste');

    expect(result).toBeInstanceOf(Array);
    expect(result[0].id_produto_categoria).toBe('teste');
  });

  it('Find Products By Category - should get empty result if has no products with category in database', async () => {
    const result = await service.findProductsByCategory('teste');

    expect(result).toBeInstanceOf(Array);
    expect(result).toStrictEqual([{}]);
  });

  it('Find Products By Gtin - should get product with the given gtin', async () => {
    const result = await service.findProdutoByCode('789100003455');

    expect(result).toBeInstanceOf(Object);
    expect(result).toStrictEqual({
      gtin: '789100003455',
      nome: 'comida',
      id_produto_categoria: 'teste',
    });
    expect(result.gtin).toBe('789100003455');
  });

  it('Create or Update - should save a new product in database', async () => {
    const result = await service.createOrUpdate(arrayProducts[0]);

    expect(result).toBeInstanceOf(Object);
    expect(result).toStrictEqual({
      gtin: '7891167021105',
      id_produto_categoria: 'Arroz',
      codigo_ncm: '03035300',
      medida_por_embalagem: null,
      produto_medida_sigla: null,
      produto_marca: 'NÃO INFORMADO',
      nome: 'Sardinha Com Ã“leo Defumado Gomes Da Costa Lata 84g',
      nome_sem_acento: 'Sardinha Com oleo Defumado Gomes Da Costa Lata 84g',
    });
  });
});
