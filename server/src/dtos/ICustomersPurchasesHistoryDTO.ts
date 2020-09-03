export interface ICustomersPurchasesHistoryItem {
  produto: string;
  variedade: string;
  pais: string;
  categoria: string;
  safra: string;
  preco: number;
}

export interface ICustomerHighestPurchaseInLatestYearDTO {
  codigo: string;
  data: string;
  cliente: string;
  item: ICustomersPurchasesHistoryItem;
}

export default interface ICustomersPurchasesHistoryDTO {
  codigo: string;
  data: string;
  cliente: string;
  itens: ICustomersPurchasesHistoryItem[];
  valorTotal: number;
}
