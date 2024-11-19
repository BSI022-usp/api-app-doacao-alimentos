import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriaDto {

  @ApiProperty({example: "Arroz"})
  nome_categoria: string

  @ApiProperty({example: "kg"})
  medida_sigla: string
}
