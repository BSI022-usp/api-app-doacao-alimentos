import { getRepositoryToken } from '@nestjs/typeorm'
import { CampanhasService } from './campanhas.service'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { Campanhas } from './entities/campanhas.entity'
// import { Repository } from 'typeorm'
import { Categorias } from './../categorias/entities/categorias.entity'
import { Arrecadacao } from './../arrecadacao/entities/arrecadacao.entity'
import { ProdutosNew } from './../produtos/entities/produto.entity'
import { Test } from '@nestjs/testing'

describe('CampanhasService', () => {
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
  }

  let service: CampanhasService
  //   let mockCategoriaRepository: Repository<Categorias>
  //   let mockCampanhaRepository: Repository<Campanhas>
  //   let mockArrecadacaoRepository: Repository<Arrecadacao>
  //   let mockProdutoRepository: Repository<ProdutosNew>

  beforeEach(async () => {
    // const mockCategoriaRepository =
    //   mockRepository as unknown as Repository<Categorias>
    // const mockCampanhaRepository = mockRepository as unknown as Repository<Campanhas>
    // const mockArrecadacaoRepository =
    //   mockRepository as unknown as Repository<Arrecadacao>
    // const mockProdutoRepository = mockRepository as unknown as Repository<ProdutosNew>

    const module = await Test.createTestingModule({
      providers: [
        CampanhasService,
        {
          provide: getRepositoryToken(Categorias),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Campanhas),
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
      ],
    }).compile()

    service = module.get<CampanhasService>(CampanhasService)
    // mockCampanhaRepository = module.get(getRepositoryToken(Campanhas))
    // mockCategoriaRepository = module.get(getRepositoryToken(Categorias))
    // mockArrecadacaoRepository = module.get(getRepositoryToken(Arrecadacao))
    // mockProdutoRepository = module.get(getRepositoryToken(ProdutosNew))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('create new campaign - should create and return the new campaign', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      label: 'Campanha Teste',
      data_inicio: new Date('2024-11-01'),
      data_fim: new Date('2024-12-31'),
    }

    const campanhaCriadaMock: Campanhas = {
      id: 1,
      ...createCampanhaDto,
    } as Campanhas

    mockRepository.create.mockReturnValue(campanhaCriadaMock)
    mockRepository.save.mockResolvedValue(campanhaCriadaMock)

    const result = await service.create(createCampanhaDto)
    expect(result).toEqual(campanhaCriadaMock)
    expect(mockRepository.create).toHaveBeenCalledWith(createCampanhaDto)
    expect(mockRepository.save).toHaveBeenCalledWith(campanhaCriadaMock)
  })

  //   it('FindAll - should return an array of campaigns', async () => {
  //     const result: Campanhas[] = [
  //       {
  //         label: 'Campanha 1',
  //         data_inicio: new Date('2024-11-01'),
  //         data_fim: new Date('2024-12-31'),
  //       },
  //       {
  //         label: 'Campanha 2',
  //         data_inicio: new Date('2024-11-01'),
  //         data_fim: new Date('2024-12-31'),
  //       },
  //     ]

  //     mockRepository.find.mockResolvedValue(result)

  //     const campanhas = await service.findAll()

  //     expect(campanhas).toEqual(result)
  //     expect(mockRepository.find).toHaveBeenCalledTimes(1)
  //     expect(mockRepository.find).toHaveBeenCalledWith({
  //       order: { id: 'DESC' },
  //     })
  //   })

  //   it('findAllCampaignsAndReportByCategory - should return an array of campaigns and report by category', async () => {
  //     const result = [
  //       {
  //         id_campanha: 14,
  //         label: 'Arrecadação 29/Nov/2024',
  //         data_inicio: '2024-11-29T03:00:00.000Z',
  //         data_fim: '2024-11-29T03:00:00.000Z',
  //         resumo: [
  //           {
  //             nome: 'Arroz',
  //             qtd_total_pacotes: 10,
  //             qtd_total_peso: 10,
  //             medida: 'kg',
  //           },
  //           {
  //             nome: 'Açucar',
  //             qtd_total_pacotes: 10,
  //             qtd_total_peso: 10,
  //             medida: 'kg',
  //           },
  //         ],
  //       },
  //       {
  //         id_campanha: 12,
  //         label: 'Arrecadação 29/Nov/2024',
  //         data_inicio: '2024-11-29T03:00:00.000Z',
  //         data_fim: '2024-11-29T03:00:00.000Z',
  //         resumo: [
  //           {
  //             nome: 'Açucar',
  //             qtd_total_pacotes: 5,
  //             qtd_total_peso: 5,
  //             medida: 'kg',
  //           },
  //         ],
  //       },
  //     ]

  //     mockRepository.find.mockResolvedValue(result)

  //     const campanhas = await service.findAllCampaignsAndReportByCategory()

  //     expect(campanhas).toEqual(result)
  //     expect(mockRepository.find).toHaveBeenCalledTimes(1)
  //     expect(mockRepository.find).toHaveBeenCalledWith({
  //       order: { id: 'DESC' },
  //     })
  //   })
})
