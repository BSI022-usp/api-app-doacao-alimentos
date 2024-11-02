import { Repository } from 'typeorm';
import { CampanhasController } from './campanhas.controller';
import { CampanhasService } from './campanhas.service';
import { Campanhas } from './entities/campanhas.entity';

describe('CampanhasController', () => {
  let controller: CampanhasController;
  let service: CampanhasService;
  let repository: Repository<Campanhas>;

  beforeAll(() => {
    service = new CampanhasService(repository);
    controller = new CampanhasController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
