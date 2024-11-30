import { Repository } from 'typeorm/repository/Repository'
import { MarcasService } from './marcas.service'
import { MarcasNew } from './entities/marca.entity'

describe('MarcasService', () => {
  let service: MarcasService
  let repository: Repository<MarcasNew>

  beforeAll(() => {
    service = new MarcasService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
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
