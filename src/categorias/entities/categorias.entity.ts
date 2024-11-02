import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Categorias {
  @PrimaryColumn({ length: 50 })
  nome_categoria: string;

  @Column({ length: 50 })
  medida_sigla: string;
}
