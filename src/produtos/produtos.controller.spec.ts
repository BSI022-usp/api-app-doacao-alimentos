import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { Repository } from 'typeorm';
import { ProdutosNew } from './entities/produto.entity';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  let service: ProdutosService;
  let repository: Repository<ProdutosNew>;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [ProdutosController],
  //     providers: [ProdutosService],
  //   }).compile();

  //   controller = module.get<ProdutosController>(ProdutosController);
  // });

  beforeAll(() => {
    service = new ProdutosService(repository)
    controller = new ProdutosController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
