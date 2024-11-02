import { Arrecadacao } from '../../arrecadacao/entities/arrecadacao.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Campanhas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  label: string;

  @Column()
  data_inicio: Date;

  @Column()
  data_fim: Date;

  @OneToMany(() => Arrecadacao, (arrecadacao) => arrecadacao.campanha)
  public arrecadacao: Arrecadacao[];
}
