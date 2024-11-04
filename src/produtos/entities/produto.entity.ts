import { Arrecadacao } from '../../arrecadacao/entities/arrecadacao.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class ProdutosNew {
  @PrimaryColumn()
  gtin: string;

  @Column({ length: 50 })
  id_produto_categoria: string;

  @Column()
  codigo_ncm: string;

  @Column()
  medida_por_embalagem: number;

  @Column({ length: 50 })
  produto_medida_sigla: string;

  @Column({ length: 100 })
  produto_marca: string;

  @Column()
  nome: string;

  @Column()
  nome_sem_acento: string;

  @OneToMany(() => Arrecadacao, (arrecadacao) => arrecadacao.produto)
  public arrecadacao: Arrecadacao[];
}
