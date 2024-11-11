export class CreateProdutoDto {
  gtin: string;
  id_produto_categoria: string;
  codigo_ncm: string;
  medida_por_embalagem: number;
  produto_medida_sigla: string;
  produto_marca: string;
  nome: string;
  nome_sem_acento: string;
}
