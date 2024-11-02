import { ArrecadacaoController } from './arrecadacao.controller';
import { ArrecadacaoService } from './arrecadacao.service';
import { Arrecadacao } from './entities/arrecadacao.entity';
import { Repository } from 'typeorm';

describe('ArrecadacaoController', () => {
  let controller: ArrecadacaoController;
  let service: ArrecadacaoService;
  let repository: Repository<Arrecadacao>;

  beforeAll(() => {
    service = new ArrecadacaoService(repository);
    controller = new ArrecadacaoController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
