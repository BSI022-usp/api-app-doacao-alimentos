import { CategoriasService } from './categorias.service'
import { Categorias } from './entities/categorias.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'

describe('CategoriasService', () => {
  let service: CategoriasService
  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categorias),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<CategoriasService>(CategoriasService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('FindAll - should return an array of categories', async () => {
    const result: Categorias[] = [
      {
        nome_categoria: 'Leite',
        medida_sigla: 'L',
      },
      {
        nome_categoria: 'Arroz',
        medida_sigla: 'kg',
      },
    ]

    mockRepository.find.mockResolvedValue(result)

    const categories = await service.findAll()

    expect(categories).toEqual(result)
    expect(mockRepository.find).toHaveBeenCalledTimes(1)
    expect(mockRepository.find).toHaveBeenCalledWith({
      order: { nome_categoria: 'ASC' },
    })
  })

  it('Create - should save and return a new category', async () => {
    const savedCategory: Categorias = {
      nome_categoria: 'Leite',
      medida_sigla: 'L',
    }

    mockRepository.save.mockResolvedValue(savedCategory)

    const result = await service.create(savedCategory)

    expect(result).toEqual(savedCategory)
    expect(result.nome_categoria).toBe(savedCategory.nome_categoria)
    expect(result.medida_sigla).toBe(savedCategory.medida_sigla)
  })
})
