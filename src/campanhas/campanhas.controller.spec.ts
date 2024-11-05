import { Repository } from 'typeorm';
import { CampanhasController } from './campanhas.controller';
import { CampanhasService } from './campanhas.service';
import { Campanhas } from './entities/campanhas.entity';
import { ArrecadacaoService } from '../arrecadacao/arrecadacao.service';
import { Arrecadacao } from 'src/arrecadacao/entities/arrecadacao.entity';

describe('CampanhasController', () => {
  let controller: CampanhasController;
  let service: CampanhasService;
  let serviceArracadacoes: ArrecadacaoService;
  let repository: Repository<Campanhas>;
  let repositoryArrecadacao: Repository<Arrecadacao>;

  beforeAll(() => {
    service = new CampanhasService(repository);
    serviceArracadacoes = new ArrecadacaoService(repositoryArrecadacao);
    controller = new CampanhasController(service, serviceArracadacoes);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
