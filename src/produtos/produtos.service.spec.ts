/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';
import { ProdutosNew } from './entities/produto.entity';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getRepositoryToken(ProdutosNew),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
    repositoryMock = module.get(getRepositoryToken(ProdutosNew));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

repositoryMockFactory: () =>
  (MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    // ...
  })));
