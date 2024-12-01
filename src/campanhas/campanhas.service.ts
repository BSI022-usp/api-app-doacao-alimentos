import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCampanhaDto } from './dto/create-campanha.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Not, Repository } from 'typeorm'
import { IsNull } from 'typeorm'
import { Campanhas } from './entities/campanhas.entity'
import { Arrecadacao } from './../arrecadacao/entities/arrecadacao.entity'
import { ProdutosNew } from './../produtos/entities/produto.entity'
import { Categorias } from './../categorias/entities/categorias.entity'

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
    private readonly produtoRepository: Repository<ProdutosNew>
  ) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanhas> {
    const newCampanha = this.campanhaRepository.create(createCampanhaDto)
    return await this.campanhaRepository.save(newCampanha)
  }

  //pegar todas as campanhas
  async findAll() {
    return await this.campanhaRepository.find({
      order: {
        id: 'DESC',
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} campanha`
  }

  async updateDataFim(id: number) {
    const campanha = await this.campanhaRepository.findOne({
      where: { id },
    })
    if (!campanha) {
      throw new NotFoundException('Campanha não encontrada')
    }
    if (campanha.data_fim !== null) {
      throw new BadRequestException('Campanha já finalizada')
    }

    campanha.data_fim = new Date()
    return this.campanhaRepository.save(campanha)
  }

  remove(id: number) {
    return `This action removes a #${id} campanha`
  }

  async getEstatisticas(idCampanha: number, nomeCategoria: string) {
    // Buscar todas as arrecadações da campanha
    const arrecadacoes = await this.arrecadacaoRepository.findBy({
      id_campanha: idCampanha,
    })

    // Obter todos os IDs de produtos das arrecadações
    const idsProdutos = arrecadacoes.map(
      (arrecadacao) => arrecadacao.id_produto
    )

    // Buscar produtos da categoria solicitada
    const produtosCategoria = await this.produtoRepository.find({
      where: {
        id_produto_categoria: nomeCategoria,
        gtin: In(idsProdutos),
      },
    })

    // Buscar medida da categoria solicitada
    const categoria = await this.categoriaRepository.findOne({
      where: {
        nome_categoria: nomeCategoria,
      },
    })

    if (!categoria) {
      throw new Error(`Categoria '${nomeCategoria}' não encontrada.`)
    }

    // Consolidar dados no formato esperado
    const acumulado: { [peso: number]: number } = {}

    produtosCategoria.forEach((produto) => {
      // Filtrar as arrecadações do produto atual
      const arrecadacoesProduto = arrecadacoes.filter(
        (arrecadacao) => arrecadacao.id_produto === produto.gtin
      )

      // Somar qtd_total das arrecadações deste produto
      const qtd_pacotes = arrecadacoesProduto.reduce(
        (sum, curr) => sum + curr.qtd_total,
        0
      )

      // Consolidar os valores no mapeamento intermediário
      if (acumulado[produto.medida_por_embalagem]) {
        acumulado[produto.medida_por_embalagem] += qtd_pacotes
      } else {
        acumulado[produto.medida_por_embalagem] = qtd_pacotes
      }
    })

    // Formatar o resultado final com base no acumulado
    const arrecadados = Object.entries(acumulado).map(
      ([peso, qtd_pacotes]) => ({
        peso: Number(peso),
        qtd_pacotes,
      })
    )

    // Retornar no formato JSON esperado
    return {
      idCampanha,
      nomeCategoria,
      medida: categoria.medida_sigla, // Usar a medida da tabela categorias
      arrecadados,
    }
  }

  async getArrecadacoesComProdutos(idCampanha: number) {
    const arrecadacaoByCampanha = await this.arrecadacaoRepository.find({
      where: { id_campanha: idCampanha },
    })

    // Busca informações dos produtos associados às arrecadações
    const getProductInfoFromArrecadacao = await Promise.all(
      arrecadacaoByCampanha.map(async (arrecadacao) => {
        try {
          const produto = await this.produtoRepository.findOne({
            where: { gtin: arrecadacao.id_produto },
          })
          return { ...arrecadacao, produto }
        } catch (error) {
          console.error(
            'Erro ao buscar produto:',
            arrecadacao.id_produto,
            error
          )
          return { ...arrecadacao, produto: {} }
        }
      })
    )

    return getProductInfoFromArrecadacao
  }

  async getCollectionByCampaignId(idCampanha: number) {
    const getProductInfoFromArrecadacao =
      await this.getArrecadacoesComProdutos(idCampanha)

    const arrecadacoesDaCampanha = getProductInfoFromArrecadacao.map(
      (arrecadacao) => ({
        id_produto: arrecadacao.id_produto,
        qtd_total: arrecadacao.qtd_total,
        produto: arrecadacao.produto,
      })
    )
    return {
      id_campanha: idCampanha,
      arrecadacoes: arrecadacoesDaCampanha,
    }
  }

  async getCollectionFromAllCategoriesByCampaignId(idCampanha: number) {
    const categorias = await this.categoriaRepository.find()
    const mappedCategorias = categorias.reduce((acc, categoria) => {
      acc[categoria.nome_categoria] = categoria.medida_sigla
      return acc
    }, {})

    const getProductInfoFromArrecadacao =
      await this.getArrecadacoesComProdutos(idCampanha)

    // aqui apenas calcula o total de pacotes e peso por categoria
    const relatorioCategorias = Object.entries(
      getProductInfoFromArrecadacao.reduce(
        (categoryAccumulator, arrecadacao) => {
          const categoria =
            (arrecadacao.produto as ProdutosNew)?.id_produto_categoria ||
            'Sem categoria'
          const medida = mappedCategorias[categoria] || 'Sem medida'
          const totalPeso =
            (arrecadacao.qtd_total || 1) *
            ((arrecadacao.produto as ProdutosNew)?.medida_por_embalagem || 1)

          if (!categoryAccumulator[categoria]) {
            categoryAccumulator[categoria] = {
              categoria,
              qtd_total: 0,
              peso_total: 0,
              medida,
            }
          }

          categoryAccumulator[categoria].qtd_total += arrecadacao.qtd_total || 0
          categoryAccumulator[categoria].peso_total += totalPeso

          return categoryAccumulator
        },
        {}
      )
    ).map(([, categoriaData]) => categoriaData)

    return {
      id_campanha: idCampanha,
      relatorio_categorias: relatorioCategorias,
    }
  }

  async getResumoByCampanhaId(idCampanha: number) {
    // Buscar todas as categorias
    const categorias = await this.categoriaRepository.find()

    const categoriasEstatisticas = await Promise.all(
      categorias.map(async (categoria) => {
        const estatisticasCategoria = await this.getEstatisticas(
          idCampanha,
          categoria.nome_categoria
        )

        // Calcular total de pacotes e peso para a categoria
        const qtd_total_pacotes = estatisticasCategoria.arrecadados.reduce(
          (sum, item) => sum + item.qtd_pacotes,
          0
        )

        const qtd_total_peso = estatisticasCategoria.arrecadados.reduce(
          (sum, item) => sum + item.peso * item.qtd_pacotes,
          0
        )

        return {
          nome: categoria.nome_categoria,
          qtd_total_pacotes,
          qtd_total_peso,
          medida: estatisticasCategoria.medida,
        }
      })
    )

    // Filtrar categorias com qtd_total_pacotes > 0
    const categoriasFiltradas = categoriasEstatisticas.filter(
      (categoria) => categoria.qtd_total_pacotes > 0
    )

    return {
      idCampanha,
      categorias: categoriasFiltradas,
    }
  }

  async findInProgress() {
    const campanhasInProgress = await this.campanhaRepository.find({
      where: {
        data_fim: IsNull(),
      },
      order: {
        data_inicio: 'DESC',
      },
    })
    return campanhasInProgress
  }

  async findAllCampaignsAndReportByCategory() {
    const campanhas: Campanhas[] | [] =
      (await this.campanhaRepository.find({
        where: {
          data_fim: Not(IsNull()),
        },
        order: {
          id: 'DESC',
        },
      })) || []

    const campanhasEstatisticasByCategory = await Promise.all(
      campanhas.map(async (campanha) => {
        const resumoCampanha = await this.getResumoByCampanhaId(campanha.id)
        const result = {
          id_campanha: campanha.id,
          label: campanha.label,
          data_inicio: campanha.data_inicio,
          data_fim: campanha.data_fim,
          resumo: resumoCampanha.categorias,
        }
        return result
      })
    )

    return campanhasEstatisticasByCategory
  }
}
