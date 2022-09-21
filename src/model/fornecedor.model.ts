import { IEmpenho } from "./empenho.model";

export interface IFornecedor {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  id: number;
  empenhos: IEmpenho[]
}
