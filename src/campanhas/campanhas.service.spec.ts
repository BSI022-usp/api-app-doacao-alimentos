import { CampanhasService } from './campanhas.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { Campanhas } from './entities/campanhas.entity';
import { Repository } from 'typeorm';


const mockRepository = {
  create: jest.fn(),
  save: jest.fn()
}

describe('CampanhasService', () => {
  let service: CampanhasService;
  let repository: Repository<Campanhas>;

  beforeAll(() => {
    repository = mockRepository as unknown as Repository<Campanhas>;
    service = new CampanhasService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create new campaign - should create and return the new campaign', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      label: 'Campanha Teste',
      data_inicio: new Date('2024-11-01'),
      data_fim: new Date('2024-12-31')
    }

    const campanhaCriadaMock: Campanhas = {
      id: 1,
      ...createCampanhaDto
    } as Campanhas

    mockRepository.create.mockReturnValue(campanhaCriadaMock)
    mockRepository.save.mockResolvedValue(campanhaCriadaMock)

    const result = await service.create(createCampanhaDto)
    expect(result).toEqual(campanhaCriadaMock)
    expect(mockRepository.create).toHaveBeenCalledWith(createCampanhaDto)
    expect(mockRepository.save).toHaveBeenCalledWith(campanhaCriadaMock)
  })
});
