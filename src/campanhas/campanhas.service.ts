import { Injectable } from '@nestjs/common';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campanhas } from './entities/campanhas.entity';
import { In, Repository } from 'typeorm';
import { Arrecadacao } from 'src/arrecadacao/entities/arrecadacao.entity';
import { ProdutosNew } from 'src/produtos/entities/produto.entity';
import { Categorias } from 'src/categorias/entities/categorias.entity';
import { ArrecadacaoService } from 'src/arrecadacao/arrecadacao.service';

@Injectable()
export class CampanhasService {

  constructor(
    @InjectRepository(Categorias)
    private categoriaRepository: Repository<Categorias>,
    @InjectRepository(Campanhas)
    private campanhaRepository: Repository<Campanhas>,
    @InjectRepository(Arrecadacao)
    private readonly arrecadacaoRepository: Repository<Arrecadacao>,
    @InjectRepository(ProdutosNew)
    private readonly produtoRepository: Repository<ProdutosNew>,
    private readonly arrecadacaoService: ArrecadacaoService,
  ) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanhas> {
    const newCampanha = this.campanhaRepository.create(createCampanhaDto);
    return await this.campanhaRepository.save(newCampanha);
}
  //pegar todas as campanhas 
  async findAll() {
    return await this.campanhaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} campanha`;
  }

  update(id: number, updateCampanhaDto: UpdateCampanhaDto) {
    return `This action updates a #${id} campanha`;
  }

  remove(id: number) {
    return `This action removes a #${id} campanha`;
  }

  async getEstatisticas(idCampanha: number, nomeCategoria: string) {
    // Buscar todas as arrecadações da campanha
    const arrecadacoes = await this.arrecadacaoRepository.findBy({
      id_campanha: idCampanha,
    });
  
    // Obter todos os IDs de produtos das arrecadações
    const idsProdutos = arrecadacoes.map((arrecadacao) => arrecadacao.id_produto);
  
    // Buscar produtos da categoria solicitada
    const produtosCategoria = await this.produtoRepository.find({
      where: {
        id_produto_categoria: nomeCategoria,
        gtin: In(idsProdutos),
      },
    });
  
    // Buscar medida da categoria solicitada
    const categoria = await this.categoriaRepository.findOne({
      where: {
        nome_categoria: nomeCategoria,
      },
    });
  
    if (!categoria) {
      throw new Error(`Categoria '${nomeCategoria}' não encontrada.`);
    }
  
    // Consolidar dados no formato esperado
    const acumulado: { [peso: number]: number } = {};
  
    produtosCategoria.forEach((produto) => {
      // Filtrar as arrecadações do produto atual
      const arrecadacoesProduto = arrecadacoes.filter(
        (arrecadacao) => arrecadacao.id_produto === produto.gtin,
      );
  
      // Somar qtd_total das arrecadações deste produto
      const qtd_pacotes = arrecadacoesProduto.reduce(
        (sum, curr) => sum + curr.qtd_total,
        0,
      );
  
      // Consolidar os valores no mapeamento intermediário
      if (acumulado[produto.medida_por_embalagem]) {
        acumulado[produto.medida_por_embalagem] += qtd_pacotes;
      } else {
        acumulado[produto.medida_por_embalagem] = qtd_pacotes;
      }
    });
  
    // Formatar o resultado final com base no acumulado
    const arrecadados = Object.entries(acumulado).map(([peso, qtd_pacotes]) => ({
      peso: Number(peso),
      qtd_pacotes,
    }));
  
    // Retornar no formato JSON esperado
    return {
      idCampanha,
      nomeCategoria,
      medida: categoria.medida_sigla, // Usar a medida da tabela categorias
      arrecadados,
    };
  }

  async getEstatisticasGerais(idCampanha: number) {
    // Buscar todas as categorias
    const categorias = await this.categoriaRepository.find();

    const categoriasEstatisticas = await Promise.all(
      categorias.map(async (categoria) => {
        const estatisticasCategoria = await this.getEstatisticas(
          idCampanha,
          categoria.nome_categoria,
        );

        // Calcular total de pacotes e peso para a categoria
        const qtd_total_pacotes = estatisticasCategoria.arrecadados.reduce(
          (sum, item) => sum + item.qtd_pacotes,
          0,
        );

        const qtd_total_peso = estatisticasCategoria.arrecadados.reduce(
          (sum, item) => sum + item.peso * item.qtd_pacotes,
          0,
        );

        return {
          nome: categoria.nome_categoria,
          qtd_total_pacotes,
          qtd_total_peso,
          medida: estatisticasCategoria.medida,
        };
      }),
    );

    // Filtrar categorias com qtd_total_pacotes > 0
    const categoriasFiltradas = categoriasEstatisticas.filter(
      (categoria) => categoria.qtd_total_pacotes > 0,
    );

    return {
      idCampanha,
      categorias: categoriasFiltradas,
    };
  }

}
