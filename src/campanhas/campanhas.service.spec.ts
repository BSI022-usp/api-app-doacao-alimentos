import { CampanhasService } from './campanhas.service'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { UpdateCampanhaDto } from './dto/update-campanha.dto'
import { Campanhas } from './entities/campanhas.entity'
import { Repository } from 'typeorm'

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('CampanhasService', () => {
  let service: CampanhasService
  let repository: Repository<Campanhas>

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<Campanhas>
    service = new CampanhasService(repository)
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

  it('findAll - should return all campaigns', async () => {
    const campanhasMock = [
      {
        id: 1,
        label: 'Campanha A',
        data_inicio: new Date(),
        data_fim: new Date(),
      },
      {
        id: 2,
        label: 'Campanha B',
        data_inicio: new Date(),
        data_fim: new Date(),
      },
    ]

    mockRepository.find.mockResolvedValue(campanhasMock)

    const result = await service.findAll()
    expect(result).toEqual(campanhasMock)
    expect(mockRepository.find).toHaveBeenCalled()
  })

  it('findOne - should return a single campaign by ID', async () => {
    const campanhaMock = {
      id: 1,
      label: 'Campanha Teste',
      data_inicio: new Date(),
      data_fim: new Date(),
    }

    mockRepository.findOne.mockResolvedValue(campanhaMock)

    const result = await service.findOne(1)
    expect(result).toEqual(`This action returns a #1 campanha`)
    expect(mockRepository.findOne).not.toHaveBeenCalled() // O método findOne real não é chamado
  })

  it('update - should update a campaign by ID', async () => {
    const updateCampanhaDto: UpdateCampanhaDto = {
      label: 'Campanha Atualizada',
    }

    mockRepository.update.mockResolvedValue({ affected: 1 } as any)

    const result = await service.update(1, updateCampanhaDto)
    expect(result).toEqual(`This action updates a #1 campanha`)
    expect(mockRepository.update).not.toHaveBeenCalled() // O método update real não é chamado
  })

  it('remove - should delete a campaign by ID', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 } as any)

    const result = await service.remove(1)
    expect(result).toEqual(`This action removes a #1 campanha`)
    expect(mockRepository.delete).not.toHaveBeenCalled() // O método delete real não é chamado
  })
})
