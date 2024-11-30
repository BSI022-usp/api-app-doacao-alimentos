import { MarcasController } from './marcas.controller'
import { MarcasService } from './marcas.service'
import { Repository } from 'typeorm'
import { MarcasNew } from './entities/marca.entity'

describe('MarcasController', () => {
  let controller: MarcasController
  let service: MarcasService
  let repository: Repository<MarcasNew>

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [MarcasController],
  //     providers: [MarcasService],
  //   }).compile();

  //   controller = module.get<MarcasController>(MarcasController);
  // });

  beforeAll(() => {
    service = new MarcasService(repository)
    controller = new MarcasController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
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

    const marcas = await controller.findAll()
    expect(marcas).toBe(result)
  })

  it('should return a marca by name', async () => {
    const result: MarcasNew = {
      nome: 'Marca 1',
    }
    jest
      .spyOn(service, 'findMarcaByName')
      .mockImplementation(() => Promise.resolve(result))

    const marca = await controller.findOne('Marca 1')
    expect(marca).toBe(result)
  })
})
