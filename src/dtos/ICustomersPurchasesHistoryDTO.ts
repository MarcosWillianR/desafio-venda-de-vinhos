interface ICustomersPurchasesHistoryItem {
  produto: string;
  variedade: string;
  pais: string;
  categoria: string;
  safra: string;
  preco: number;
}

export default interface ICustomersPurchasesHistoryDTO {
  codigo: string;
  data: string;
  cliente: string;
  itens: ICustomersPurchasesHistoryItem[];
  valorTotal: number;
}
