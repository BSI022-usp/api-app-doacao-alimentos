import { Campanhas } from '../../campanhas/entities/campanhas.entity';
import { ProdutosNew } from '../../produtos/entities/produto.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Arrecadacao {
  @PrimaryColumn()
  public id_campanha: number;

  @PrimaryColumn()
  public id_produto: string;

  @Column()
  public qtd_total: number;

  @ManyToOne(() => Campanhas, (campanha) => campanha.arrecadacao)
  @JoinColumn({ name: 'id_campanha' })
  public campanha: Campanhas;

  @ManyToOne(() => ProdutosNew, (produto) => produto.arrecadacao)
  @JoinColumn({ name: 'id_produto' })
  public produto: ProdutosNew;
}
