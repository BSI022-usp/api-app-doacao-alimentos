import { Test, TestingModule } from '@nestjs/testing';
import { CampanhasController } from './campanhas.controller';
import { CampanhasService } from './campanhas.service';

describe('CampanhasController', () => {
  let controller: CampanhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampanhasController],
      providers: [CampanhasService],
    }).compile();

    controller = module.get<CampanhasController>(CampanhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
