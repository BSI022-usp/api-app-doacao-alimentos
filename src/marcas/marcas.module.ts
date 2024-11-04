import { Module } from '@nestjs/common'
import { MarcasService } from './marcas.service'
import { MarcasController } from './marcas.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarcasNew } from './entities/marca.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MarcasNew])],
  controllers: [MarcasController],
  providers: [MarcasService],
})
export class MarcasModule {}
