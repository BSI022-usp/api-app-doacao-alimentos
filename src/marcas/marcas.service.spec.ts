import { MarcasService } from './marcas.service'
import { MarcasNew } from './entities/marca.entity'
import { Repository } from 'typeorm'
import { CreateMarcaDto } from './dto/create-marca.dto'

const mockRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
}

describe('MarcasService', () => {
  let service: MarcasService
  let repository: Repository<MarcasNew>

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<MarcasNew>
    service = new MarcasService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll - should return a list of brands', async () => {
    const marcasMock: MarcasNew[] = [
      { nome: 'Marca 1' },
      { nome: 'Marca 2' },
    ] as MarcasNew[]

    jest.spyOn(repository, 'find').mockResolvedValue(marcasMock)

    const result = await service.findAll()
    expect(result).toEqual(marcasMock)
    expect(repository.find).toHaveBeenCalledWith({ take: 20 })
  })

  it('create - should save a new brand in the database', async () => {
    const createMarcaDto: CreateMarcaDto = { nome: 'Marca Teste' }
    const expectedMarca: MarcasNew = { nome: 'Marca Teste' } as MarcasNew

    jest.spyOn(repository, 'create').mockReturnValue(expectedMarca)
    jest.spyOn(repository, 'save').mockResolvedValue(expectedMarca)

    const result = await service.create(createMarcaDto)
    expect(result).toEqual(expectedMarca)
    expect(repository.create).toHaveBeenCalledWith(createMarcaDto)
    expect(repository.save).toHaveBeenCalledWith(expectedMarca)
  })

  it('findMarcaByName - should return a brand by name', async () => {
    const expectedMarca: MarcasNew = { nome: 'Marca Teste' } as MarcasNew

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedMarca)

    const result = await service.findMarcaByName('Marca Teste')
    expect(result).toEqual(expectedMarca)
    expect(repository.findOneBy).toHaveBeenCalledWith({ nome: 'Marca Teste' })
  })

  it('should return an array of marcas', async () => {
    const result: MarcasNew[] = [
      {
        nome: 'Marca 1',
      },
      {
        nome: 'Marca 2',
      },
    ]
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(result))

    const marcas = await service.findAll()
    expect(marcas).toBe(result)
  })
})
