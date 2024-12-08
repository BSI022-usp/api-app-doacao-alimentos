import { Test, TestingModule } from '@nestjs/testing';
import { CampanhasService } from './campanhas.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { Campanhas } from './entities/campanhas.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categorias } from '../categorias/entities/categorias.entity';
import { Arrecadacao } from '../arrecadacao/entities/arrecadacao.entity';
import { ProdutosNew } from '../produtos/entities/produto.entity';
import { ArrecadacaoService } from '../arrecadacao/arrecadacao.service';

describe('CampanhasService', () => {
  let service: CampanhasService;
  let campanhaRepository: Repository<Campanhas>;
  let categoriaRepository: Repository<Categorias>;
  let arrecadacaoRepository: Repository<Arrecadacao>;
  let produtoRepository: Repository<ProdutosNew>;
  let arrecadacaoService: ArrecadacaoService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockArrecadacaoService = {
    someServiceMethod: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampanhasService,
        {
          provide: getRepositoryToken(Campanhas),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Categorias),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Arrecadacao),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ProdutosNew),
          useValue: mockRepository,
        },
        {
          provide: ArrecadacaoService,
          useValue: mockArrecadacaoService,
        },
      ],
    }).compile();

    service = module.get<CampanhasService>(CampanhasService);
    campanhaRepository = module.get<Repository<Campanhas>>(getRepositoryToken(Campanhas));
    categoriaRepository = module.get<Repository<Categorias>>(getRepositoryToken(Categorias));
    arrecadacaoRepository = module.get<Repository<Arrecadacao>>(getRepositoryToken(Arrecadacao));
    produtoRepository = module.get<Repository<ProdutosNew>>(getRepositoryToken(ProdutosNew));
    arrecadacaoService = module.get<ArrecadacaoService>(ArrecadacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create new campaign - should create and return the new campaign', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      label: 'Campanha Teste',
      data_inicio: new Date('2024-11-01'),
      data_fim: new Date('2024-12-31'),
    };

    const campanhaCriadaMock: Campanhas = {
      id: 1,
      ...createCampanhaDto,
    } as Campanhas;

    mockRepository.create.mockReturnValue(campanhaCriadaMock);
    mockRepository.save.mockResolvedValue(campanhaCriadaMock);

    const result = await service.create(createCampanhaDto);
    expect(result).toEqual(campanhaCriadaMock);
    expect(mockRepository.create).toHaveBeenCalledWith(createCampanhaDto);
    expect(mockRepository.save).toHaveBeenCalledWith(campanhaCriadaMock);
  });
});
