import { ArrecadacaoController } from './arrecadacao.controller';
import { ArrecadacaoService } from './arrecadacao.service';
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto';
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

  it('create - should call service and create a new arrecadacao object', async () => {
    const arrecadacaoMock = {
      id_produto: '7891200039437',
      id_campanha: 3,
      qtd_total: 2,
    } as Arrecadacao;

    jest
      .spyOn(service, 'createOrUpdate')
      .mockResolvedValueOnce(arrecadacaoMock);

    const result = await controller.create(arrecadacaoMock);

    expect(result.id_produto).toEqual('7891200039437');
    expect(result.id_campanha).toEqual(3);
    expect(result.qtd_total).toEqual(2);
  });
});
