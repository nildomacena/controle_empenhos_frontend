export interface ITipoMovimentacao {
  descricao: string;
  id: number;
}

export interface IMovimentacao {
  data: Date;
  observacoes: string;
  id: number;
  tipoMovimentacao: ITipoMovimentacao;
}
