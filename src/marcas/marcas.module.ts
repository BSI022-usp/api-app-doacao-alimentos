import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marcas } from './entities/marca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marcas])],
  controllers: [MarcasController],
  providers: [MarcasService],
})
export class MarcasModule {}
