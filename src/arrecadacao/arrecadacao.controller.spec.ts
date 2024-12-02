import { ArrecadacaoController } from './arrecadacao.controller'
import { ArrecadacaoService } from './arrecadacao.service'
import { CreateArrecadacaoDto } from './dto/create-arrecadacao.dto'
import { Arrecadacao } from './entities/arrecadacao.entity'
import { Repository } from 'typeorm'

describe('ArrecadacaoController', () => {
  let controller: ArrecadacaoController
  let service: ArrecadacaoService
  let repository: Repository<Arrecadacao>

  beforeAll(() => {
    service = new ArrecadacaoService(repository)
    controller = new ArrecadacaoController(service)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create - should call service and create a new arrecadacao object', async () => {
    const arrecadacaoMock = {
      id_produto: '7891200039437',
      id_campanha: 3,
      qtd_total: 2,
    } as Arrecadacao

    jest.spyOn(service, 'createOrUpdate').mockResolvedValueOnce(arrecadacaoMock)

    const result = await controller.create(arrecadacaoMock)

    expect(result.id_produto).toEqual('7891200039437')
    expect(result.id_campanha).toEqual(3)
    expect(result.qtd_total).toEqual(2)
  })
  it('findAll - should return all arrecadacoes', async () => {
    const arrecadacoesMock: Arrecadacao[] = [
      {
        id_campanha: 1,
        id_produto: '789128392174',
        qtd_total: 10,
      } as Arrecadacao,
    ]

    jest.spyOn(service, 'findAll').mockResolvedValue(arrecadacoesMock)

    const result = await controller.findAll()
    expect(result).toEqual(arrecadacoesMock)
    expect(service.findAll).toHaveBeenCalled()
  })

  it('findOne - should return an arrecadacao by ID', async () => {
    const result = await controller.findOne('1')
    expect(result).toEqual(`This action returns a #1 arrecadacao`)
  })
})
