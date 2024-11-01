import { Repository } from 'typeorm/repository/Repository';
import { MarcasService } from './marcas.service';
import { MarcasNew } from './entities/marca.entity';

describe('MarcasService', () => {
  let service: MarcasService;
  let repository: Repository<MarcasNew>;


  beforeAll(() => {
    service = new MarcasService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
