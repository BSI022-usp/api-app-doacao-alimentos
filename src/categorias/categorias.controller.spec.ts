import { CategoriasController } from './categorias.controller'
import { CategoriasService } from './categorias.service'
import { Categorias } from './entities/categorias.entity'
import { Repository } from 'typeorm'

describe('CategoriasController', () => {
  let controller: CategoriasController
  let service: CategoriasService
  let repository: Repository<Categorias>

  beforeAll(() => {
    repository = {} as Repository<Categorias>
    service = new CategoriasService(repository)
    controller = new CategoriasController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('Create - should create and return a new category', async () => {
    const newCategory = { nome_categoria: 'Leite', medida_sigla: 'L' }

    jest.spyOn(service, 'create').mockResolvedValue(newCategory)

    const result = await controller.create(newCategory)
    expect(result).toEqual(newCategory)
  })
})
