import { Module } from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { ProdutosController } from './produtos.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProdutosNew } from './entities/produto.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProdutosNew])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
