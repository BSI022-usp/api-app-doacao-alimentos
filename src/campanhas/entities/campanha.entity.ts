import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Campanhas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  label: string;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_fim: Date;
}
