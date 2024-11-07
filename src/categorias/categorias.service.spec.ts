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
})
