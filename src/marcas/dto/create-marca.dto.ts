import { ApiProperty } from "@nestjs/swagger";

export class CreateMarcaDto {
  @ApiProperty({example: "Nissin"})
  nome: string
}
