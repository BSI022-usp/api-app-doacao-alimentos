import { ArrecadacaoService } from './arrecadacao.service'
import { UpdateArrecadacaoDto } from './dto/update-arrecadacao.dto'
import { Arrecadacao } from './entities/arrecadacao.entity'
import { Repository } from 'typeorm'

describe('ArrecadacaoService', () => {
  let service: ArrecadacaoService
  let repository: Repository<Arrecadacao>
  let arrecadacaoRepository: Repository<Arrecadacao>

  const mockArrecadacaoRepository = {
    findBy: jest.fn().mockImplementation(({ id_campanha }) => {
      if (id_campanha === 1) {
        return Promise.resolve([
          { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
          { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
          { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
        ])
      }
      return Promise.resolve([])
    }),
    findOneBy: jest.fn().mockReturnValueOnce(
      Promise.resolve({
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 2,
      })
    ),
    save: jest.fn().mockReturnValueOnce(
      Promise.resolve({
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 4,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 2,
      } as Arrecadacao,
    ]),
  }

  beforeEach(() => {
    arrecadacaoRepository =
      mockArrecadacaoRepository as unknown as Repository<Arrecadacao>
    service = new ArrecadacaoService(arrecadacaoRepository)
  })

  beforeAll(() => {
    service = new ArrecadacaoService(repository)
  })

  it('arrecadacoesPorCampanha - should return arrecadacoes for a given campaign', async () => {
    const result = await service.arrecadacoesPorCampanha(1)
    expect(result).toEqual([
      { id_campanha: 1, id_produto: '12822009192', qtd_total: 2 },
      { id_campanha: 1, id_produto: '14601780007215', qtd_total: 4 },
      { id_campanha: 1, id_produto: '15601159207825', qtd_total: 5 },
    ])
  })

  it('arrecadacoesPorCampanha - should return an empty array if no arrecadacoes for the given campaign', async () => {
    const result = await service.arrecadacoesPorCampanha(2)
    expect(result).toEqual([])
  })

  it('createOrUpdate - should save a new arrecadacao object when have 2 qtd in database', async () => {
    const result = await service.createOrUpdate({
      id_produto: '7891200039437',
      id_campanha: 3,
      qtd_total: 2,
    })
    expect(result.id_produto).toEqual('7891200039437')
    expect(result.id_campanha).toEqual(3)
    expect(result.qtd_total).toEqual(4)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll - should return all arrecadacoes', async () => {
    const arrecadacoesMock = [
      {
        id_produto: '7891200039437',
        id_campanha: 3,
        qtd_total: 2,
      } as Arrecadacao,
    ]

    const result = await service.findAll()
    expect(result).toEqual(arrecadacoesMock)
  })

  it('findOne - should return an arrecadacao by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(`This action returns a #1 arrecadacao`)
  })

  it('update - should update', async () => {
    const result = await service.update(1, new UpdateArrecadacaoDto())
    expect(result).toEqual(`This action updates a #1 arrecadacao`)
  })

  it('remove - should delete', async () => {
    const result = await service.remove(1)
    expect(result).toEqual(`This action removes a #1 arrecadacao`)
  })
})
