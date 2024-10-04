import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Marcas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  id_marca: number;

  @Column({ length: 100 })
  nome: string;
}
