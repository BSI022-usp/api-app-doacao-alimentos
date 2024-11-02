import { PartialType } from '@nestjs/mapped-types'
import { CreateArrecadacaoDto } from './create-arrecadacao.dto'

export class UpdateArrecadacaoDto extends PartialType(CreateArrecadacaoDto) {}
