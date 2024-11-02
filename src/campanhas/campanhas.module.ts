import { Module } from '@nestjs/common'
import { CampanhasService } from './campanhas.service'
import { CampanhasController } from './campanhas.controller'
import { Campanhas } from './entities/campanhas.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Campanhas])],
  controllers: [CampanhasController],
  providers: [CampanhasService],
})
export class CampanhasModule {}
