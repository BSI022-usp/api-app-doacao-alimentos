import { CampanhasService } from './campanhas.service';
import { Campanhas } from './entities/campanhas.entity';
import { Repository } from 'typeorm';

describe('CampanhasService', () => {
  let service: CampanhasService;
  let repository: Repository<Campanhas>;

  beforeAll(() => {
    service = new CampanhasService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
