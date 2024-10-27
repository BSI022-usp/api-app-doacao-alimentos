import { Module } from '@nestjs/common';
import { CampanhasService } from './campanhas.service';
import { CampanhasController } from './campanhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campanhas } from './entities/campanha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campanhas])],
  controllers: [CampanhasController],
  providers: [CampanhasService],
})
export class CampanhasModule {}
