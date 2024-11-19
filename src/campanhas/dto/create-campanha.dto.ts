import { ApiProperty } from "@nestjs/swagger";

export class CreateCampanhaDto {
  @ApiProperty({example: 'NomeDaCampanha'})
  label: string;

  @ApiProperty()
  data_inicio: Date;

  @ApiProperty()
  data_fim: Date | null;
}