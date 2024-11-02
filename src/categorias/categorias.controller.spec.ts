import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { Categorias } from './entities/categorias.entity';
import { Repository } from 'typeorm';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;
  let repository: Repository<Categorias>;

  beforeAll(() => {
    service = new CategoriasService(repository);
    controller = new CategoriasController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
