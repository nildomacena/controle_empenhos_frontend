import { IFornecedor } from "./fornecedor.model";
import { IMovimentacao } from "./movimentacao.model";

export interface IEmpenho {
  id: number;
  numero: string;
  descricao: string;
  valor: number;
  data: any;
  fornecedor: IFornecedor;
  url: string | null;
  movimentacoes: IMovimentacao[];
}
