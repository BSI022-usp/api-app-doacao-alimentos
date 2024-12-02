import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'
import { Categorias } from './entities/categorias.entity'

describe('CategoriasController', () => {
  let controller: CategoriasController
  let service: CategoriasService

  beforeAll(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn().mockResolvedValue('teste'),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as CategoriasService

    controller = new CategoriasController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create - should create a new categoria', async () => {
    const createCategoriaDto = { nome_categoria: 'Leite', medida_sigla: 'L' }
    const categoriaMock = { nome_categoria: 'Leite', medida_sigla: 'L' }

    jest.spyOn(service, 'create').mockResolvedValue(categoriaMock)

    const result = await controller.create(createCategoriaDto)
    expect(result).toEqual(categoriaMock)
    expect(service.create).toHaveBeenCalledWith(createCategoriaDto)
  })

  it('findAll - should return all categorias', async () => {
    const categoriasMock = [
      { nome_categoria: 'Leite', medida_sigla: 'L' },
      { nome_categoria: 'Oleo', medida_sigla: 'L' },
    ]

    jest.spyOn(service, 'findAll').mockResolvedValue(categoriasMock)

    const result = await controller.findAll()
    expect(result).toEqual(categoriasMock)
    expect(service.findAll).toHaveBeenCalled()
  })

  it('findOne - should return a categoria by ID', async () => {
    const categoriaMock = 'teste'

    // jest.spyOn(service, 'findOne').mockResolvedValue('leite')

    const result = await controller.findOne('1')
    expect(result).toEqual(categoriaMock)
    expect(service.findOne).toHaveBeenCalledWith(1)
  })

  // it('update - should update a categoria', async () => {
  //   const updateCategoriaDto = { nome_categoria: 'Leite', medida_sigla: 'L' }
  //   const updatedCategoriaMock = { nome_categoria: 'Leite', medida_sigla: 'L' }

  //   jest.spyOn(service, 'update').mockResolvedValue(updatedCategoriaMock);

  //   const result = await controller.update('1', updateCategoriaDto);
  //   expect(result).toEqual(updatedCategoriaMock);
  //   expect(service.update).toHaveBeenCalledWith(1, updateCategoriaDto);
  // });

  // it('remove - should delete a categoria by ID', async () => {
  //   jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1 });

  //   const result = await controller.remove('1');
  //   expect(result).toEqual({ affected: 1 });
  //   expect(service.remove).toHaveBeenCalledWith(1);
  // });
})
