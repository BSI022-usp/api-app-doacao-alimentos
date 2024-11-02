import { ArrecadacaoService } from './arrecadacao.service';
import { Arrecadacao } from './entities/arrecadacao.entity';
import { Repository } from 'typeorm';

describe('ArrecadacaoService', () => {
  let service: ArrecadacaoService;
  let repository: Repository<Arrecadacao>;

  beforeAll(() => {
    service = new ArrecadacaoService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
