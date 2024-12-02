import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class MarcasNew {
  @PrimaryColumn({ length: 100 })
  nome: string
}
