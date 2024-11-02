import { CategoriasService } from './categorias.service';
import { Categorias } from './entities/categorias.entity';
import { Repository } from 'typeorm';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let repository: Repository<Categorias>;

  beforeAll(() => {
    service = new CategoriasService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
