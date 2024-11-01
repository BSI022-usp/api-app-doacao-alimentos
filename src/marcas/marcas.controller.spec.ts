import { MarcasController } from './marcas.controller';
import { MarcasService } from './marcas.service';
import { Repository } from 'typeorm';
import { MarcasNew } from './entities/marca.entity';

describe('MarcasController', () => {
  let controller: MarcasController;
  let service: MarcasService;
  let repository: Repository<MarcasNew>

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [MarcasController],
  //     providers: [MarcasService],
  //   }).compile();

  //   controller = module.get<MarcasController>(MarcasController);
  // });

  beforeAll(() => {
    service = new MarcasService(repository);
    controller = new MarcasController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
