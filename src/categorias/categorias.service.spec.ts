import { CategoriasService } from './categorias.service'
import { Categorias } from './entities/categorias.entity'
import { Repository } from 'typeorm'

const mockRepository = {
  save: jest.fn().mockResolvedValue(
    Promise.resolve<Categorias>({
      nome_categoria: 'Leite',
      medida_sigla: 'L',
    })
  ),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('CategoriasService', () => {
  let service: CategoriasService
  let repository: Repository<Categorias>

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<Categorias>
    service = new CategoriasService(repository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Create - should save and return a new category', async () => {
    const newCategory = { nome_categoria: 'Leite', medida_sigla: 'L' }

    const result = await service.create(newCategory)

    expect(result).toBeInstanceOf(Object)
    expect(result.nome_categoria).toBe(newCategory.nome_categoria)
    expect(result.medida_sigla).toBe(newCategory.medida_sigla)
  })

  it('findAll - should return all categorias', async () => {
    const categoriasMock = [{ nome_categoria: 'Leite', medida_sigla: 'L' }]

    jest.spyOn(repository, 'find').mockResolvedValue(categoriasMock)

    const result = await service.findAll()
    expect(result).toEqual(categoriasMock)
    expect(repository.find).toHaveBeenCalled()
  })

  it('findOne - should return a categoria by ID', async () => {
    const categoriaMock = { nome_categoria: 'Leite', medida_sigla: 'L' }

    jest.spyOn(repository, 'findOne').mockResolvedValue(categoriaMock)

    const result = await service.findOne(1)
    expect(result).toEqual('This action returns a #1 categoria')
  })

  it('update - should update a categoria', async () => {
    const updateCategoriaDto = { nome_categoria: 'Leite', medida_sigla: 'L' }

    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any)

    const result = await service.update(1, updateCategoriaDto)
    expect(result).toEqual('This action updates a #1 categoria')
  })

  it('remove - should delete a categoria by ID', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any)

    const result = await service.remove(1)
    expect(result).toEqual('This action removes a #1 categoria')
  })
})
