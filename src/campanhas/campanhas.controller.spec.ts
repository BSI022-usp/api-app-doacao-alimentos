import { Test, TestingModule } from '@nestjs/testing';
import { CampanhasController } from './campanhas.controller';
import { CampanhasService } from './campanhas.service';
import { ArrecadacaoService } from '../arrecadacao/arrecadacao.service';

describe('CampanhasController', () => {
  let controller: CampanhasController;
  let campanhasService: CampanhasService;
  let arrecadacaoService: ArrecadacaoService;

  const mockCampanhasService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        label: 'teste',
        data_inicio: '2024-08-11T03:00:00.000Z',
        data_fim: '2024-08-11T03:00:00.000Z',
        arrecadacoes: [
          { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
          { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
          { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
        ],
      },
    ]),
    findOne: jest.fn().mockResolvedValue([
      { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
      { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
      { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
    ]),
  };

  const mockArrecadacaoService = {
    arrecadacoesPorCampanha: jest.fn().mockResolvedValue([
      { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
      { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
      { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampanhasController],
      providers: [
        {
          provide: CampanhasService,
          useValue: mockCampanhasService,
        },
        {
          provide: ArrecadacaoService,
          useValue: mockArrecadacaoService,
        },
      ],
    }).compile();

    controller = module.get<CampanhasController>(CampanhasController);
    campanhasService = module.get<CampanhasService>(CampanhasService);
    arrecadacaoService = module.get<ArrecadacaoService>(ArrecadacaoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(campanhasService).toBeDefined();
    expect(arrecadacaoService).toBeDefined();
  });

  it('findAll - should return all campaigns with their arrecadacoes', async () => {
    const result = await controller.findAll();
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
        ],
      },
    ]);
    expect(campanhasService.findAll).toHaveBeenCalled();
  });
  
});
