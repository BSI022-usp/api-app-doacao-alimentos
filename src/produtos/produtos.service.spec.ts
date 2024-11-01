import { ProdutosService } from './produtos.service';
import { ProdutosNew } from './entities/produto.entity';
import { Repository } from 'typeorm/repository/Repository';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let repository: Repository<ProdutosNew>;

  beforeAll(() => {
    service = new ProdutosService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});