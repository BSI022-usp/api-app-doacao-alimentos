import { getRepositoryToken } from '@nestjs/typeorm'
import { CampanhasService } from './campanhas.service'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { Campanhas } from './entities/campanhas.entity'
import { Categorias } from './../categorias/entities/categorias.entity'
import { Arrecadacao } from './../arrecadacao/entities/arrecadacao.entity'
import { ProdutosNew } from './../produtos/entities/produto.entity'
import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'

describe('CampanhasService', () => {
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
  }

  let service: CampanhasService
  let arrecadacaoRepository: jest.Mocked<Repository<Arrecadacao>>
  let produtoRepository: jest.Mocked<Repository<ProdutosNew>>
  let categoriaRepository: jest.Mocked<Repository<Categorias>>

  beforeEach(async () => {
    arrecadacaoRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<Arrecadacao>>
    produtoRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<ProdutosNew>>
    categoriaRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<Categorias>>

    const module = await Test.createTestingModule({
      providers: [
        CampanhasService,
        {
          provide: getRepositoryToken(Categorias),
          useValue: categoriaRepository,
        },
        {
          provide: getRepositoryToken(Campanhas),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Arrecadacao),
          useValue: arrecadacaoRepository,
        },
        {
          provide: getRepositoryToken(ProdutosNew),
          useValue: produtoRepository,
        },
      ],
    }).compile()

    service = module.get<CampanhasService>(CampanhasService)
  })

  const mockArrecadacoesComProdutos = {
    id_campanha: 1,
    campanha: {
      id: 1,
      label: 'Campanha Teste',
      data_inicio: new Date('2024-11-01'),
      data_fim: new Date('2024-12-31'),
      arrecadacao: [],
    },
    id_produto: '123',
    qtd_total: 10,
    produto: {
      gtin: '123',
      codigo_ncm: '07133399',
      id_produto_categoria: 'Feijao',
      medida_por_embalagem: 1,
      nome: 'Feijao Teste Integração',
      nome_sem_acento: 'Feijao Teste Integracao',
      produto_marca: 'NÃO INFORMADO',
      produto_medida_sigla: null,
    },
  }

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

  it('getArrecadacoesComProdutos - should return an array of arrecadacoes with products', async () => {
    const idCampanha = 1

    const arrecadacaoMock = [
      { id_campanha: 1, id_produto: '123', qtd_total: 10 } as Arrecadacao,
    ]

    const produtoMock = {
      gtin: '123',
      codigo_ncm: '07133399',
      id_produto_categoria: 'Feijao',
      medida_por_embalagem: 1,
      nome: 'Feijao Teste Integração',
      nome_sem_acento: 'Feijao Teste Integracao',
      produto_marca: 'NÃO INFORMADO',
      produto_medida_sigla: null,
    } as ProdutosNew

    const expectedResult = [
      {
        id_campanha: 1,
        id_produto: '123',
        qtd_total: 10,
        produto: {
          gtin: '123',
          codigo_ncm: '07133399',
          id_produto_categoria: 'Feijao',
          medida_por_embalagem: 1,
          nome: 'Feijao Teste Integração',
          nome_sem_acento: 'Feijao Teste Integracao',
          produto_marca: 'NÃO INFORMADO',
          produto_medida_sigla: null,
        },
      },
    ]

    arrecadacaoRepository.find.mockResolvedValue(arrecadacaoMock)
    produtoRepository.find.mockResolvedValue([produtoMock])

    const arrecadacoes = await service.getArrecadacoesComProdutos(idCampanha)

    expect(arrecadacaoRepository.find).toHaveBeenCalledTimes(1)
    expect(arrecadacaoRepository.find).toHaveBeenCalledTimes(1)
    expect(arrecadacoes).toEqual(expectedResult)
  })

  it('getCollectionByCampaignId - should return an object with the campaign id and arrecadacoes', async () => {
    const idCampanha = 1

    const expectedResult = {
      id_campanha: 1,
      arrecadacoes: [
        {
          id_produto: '123',
          qtd_total: 10,
          produto: {
            gtin: '123',
            codigo_ncm: '07133399',
            id_produto_categoria: 'Feijao',
            medida_por_embalagem: 1,
            nome: 'Feijao Teste Integração',
            nome_sem_acento: 'Feijao Teste Integracao',
            produto_marca: 'NÃO INFORMADO',
            produto_medida_sigla: null,
          },
        },
      ],
    }

    jest
      .spyOn(service, 'getArrecadacoesComProdutos')
      .mockResolvedValue([mockArrecadacoesComProdutos])

    const arrecadacoes = await service.getCollectionByCampaignId(idCampanha)

    expect(service.getArrecadacoesComProdutos).toHaveBeenCalledTimes(1)
    expect(service.getArrecadacoesComProdutos).toHaveBeenCalledWith(idCampanha)

    expect(arrecadacoes).toEqual(expectedResult)
  })

  it('getCollectionFromAllCategoriesByCampaignId - should return an object with the campaign id and arrecadacoes grouped by category', async () => {
    const idCampanha = 1

    const mockCategorias = [
      {
        nome_categoria: 'Feijao',
        medida_sigla: 'kg',
      },
    ]

    const expectedResult = {
      id_campanha: idCampanha,
      relatorio_categorias: [
        {
          categoria: 'Feijao',
          qtd_total: 10,
          peso_total: 10,
          medida: 'kg',
        },
      ],
    }

    jest
      .spyOn(service, 'getArrecadacoesComProdutos')
      .mockResolvedValue([mockArrecadacoesComProdutos])
    categoriaRepository.find.mockResolvedValue(mockCategorias)

    const arrecadacoes =
      await service.getCollectionFromAllCategoriesByCampaignId(idCampanha)

    console.log('arrecadacoes', arrecadacoes)

    // expect(service['categoriaRepository'].find).toHaveBeenCalledTimes(1)
    expect(service.getArrecadacoesComProdutos).toHaveBeenCalledWith(idCampanha)
    expect(arrecadacoes).toEqual(expectedResult)
    expect(service.getArrecadacoesComProdutos).toHaveBeenCalledTimes(1)
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
