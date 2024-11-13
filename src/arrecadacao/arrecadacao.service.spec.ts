import { ArrecadacaoService } from './arrecadacao.service';
import { Arrecadacao } from './entities/arrecadacao.entity';
import { Repository } from 'typeorm';

describe('ArrecadacaoService', () => {
  let service: ArrecadacaoService;
  let repository: Repository<Arrecadacao>;
  let arrecadacaoRepository: Repository<Arrecadacao>;

  const mockArrecadacaoRepository = {
    findBy: jest.fn().mockImplementation(({ id_campanha }) => {
      if (id_campanha === 1) {
        return Promise.resolve([
          { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
          { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
          { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
        ]);
      }
      return Promise.resolve([]);
    }),
    findOneBy: jest.fn().mockReturnValueOnce(
      Promise.resolve({
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 2,
      }),
    ),
    save: jest.fn().mockReturnValueOnce(
      Promise.resolve({
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 4,
      }),
    ),
  };

  beforeEach(() => {
    arrecadacaoRepository =
      mockArrecadacaoRepository as unknown as Repository<Arrecadacao>;
    service = new ArrecadacaoService(arrecadacaoRepository);
  });

  beforeAll(() => {
    service = new ArrecadacaoService(repository);
  });

  it('arrecadacoesPorCampanha - should return arrecadacoes for a given campaign', async () => {
    const result = await service.arrecadacoesPorCampanha(1);
    expect(result).toEqual([
      { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
      { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
      { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
    ]);
  });

  it('arrecadacoesPorCampanha - should return an empty array if no arrecadacoes for the given campaign', async () => {
    const result = await service.arrecadacoesPorCampanha(2);
    expect(result).toEqual([]);
  });

  it('createOrUpdate - should save a new arrecadacao object when have 2 qtd in database', async () => {
    const result = await service.createOrUpdate({
      id_produto: '7891200039437',
      id_campanha: 3,
      qtd_total: 2,
    });
    expect(result.id_produto).toEqual('7891200039437');
    expect(result.id_campanha).toEqual(3);
    expect(result.qtd_total).toEqual(4);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
