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
  let campanhasService: CampanhasService
  let arrecadacaoService: ArrecadacaoService

  beforeAll(() => {
    service = new CampanhasService(repository);
    serviceArracadacoes = new ArrecadacaoService(repositoryArrecadacao);
    controller = new CampanhasController(service, serviceArracadacoes);
  });

  beforeEach(() => {
    campanhasService = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          label: 'teste',
          data_inicio: '2024-08-11T03:00:00.000Z',
          data_fim: '2024-08-11T03:00:00.000Z'
        }
      ])
    } as unknown as CampanhasService
    
    arrecadacaoService = {
      arrecadacoesPorCampanha: jest.fn().mockResolvedValue([
        { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
        { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
        { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
      ])
    } as unknown as ArrecadacaoService
    
    controller = new CampanhasController(campanhasService, arrecadacaoService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll - should return all campaigns with their arrecadacoes', async () => {
    const result = await controller.findAll()
    expect(result).toEqual([
      {
        id: 1,
        label: 'teste',
        data_inicio: '2024-08-11T03:00:00.000Z',
        data_fim: '2024-08-11T03:00:00.000Z',
        arrecadacoes: [
          { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
          { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
          { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
        ]
      }
    ])
  })

  it('findOne - should return arrecadacoes for a specific campaign', async () => {
    const result = await controller.findOne('1')
    expect(result).toEqual([
      { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
      { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
      { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
    ])
  })
});
