import { MarcasController } from './marcas.controller'
import { MarcasService } from './marcas.service'
import { MarcasNew } from './entities/marca.entity'
import { CreateMarcaDto } from './dto/create-marca.dto'

describe('MarcasController', () => {
  let controller: MarcasController
  let service: MarcasService

  beforeAll(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findMarcaByName: jest.fn(),
    } as unknown as MarcasService

    controller = new MarcasController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create - should call service to create a new brand', async () => {
    const createMarcaDto: CreateMarcaDto = { nome: 'Marca Teste' }
    const expectedMarca: MarcasNew = { nome: 'Marca Teste' } as MarcasNew

    jest.spyOn(service, 'create').mockResolvedValue(expectedMarca)

    const result = await controller.create(createMarcaDto)
    expect(result).toEqual(expectedMarca)
    expect(service.create).toHaveBeenCalledWith(createMarcaDto)
  })

  it('findAll - should return a list of all brands', async () => {
    const marcasMock: MarcasNew[] = [
      { nome: 'Marca 1' },
      { nome: 'Marca 2' },
    ] as MarcasNew[]

    jest.spyOn(service, 'findAll').mockResolvedValue(marcasMock)

    const result = await controller.findAll()
    expect(result).toEqual(marcasMock)
    expect(service.findAll).toHaveBeenCalled()
  })

  it('findOne - should return a brand by name', async () => {
    const expectedMarca: MarcasNew = { nome: 'Marca Teste' } as MarcasNew

    jest.spyOn(service, 'findMarcaByName').mockResolvedValue(expectedMarca)

    const result = await controller.findOne('Marca Teste')
    expect(result).toEqual(expectedMarca)
    expect(service.findMarcaByName).toHaveBeenCalledWith('Marca Teste')
  })
})
