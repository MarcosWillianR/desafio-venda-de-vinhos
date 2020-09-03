import ICustomerDTO from './ICustomersDTO';
import ICustomersPurchasesHistoryDTO from './ICustomersPurchasesHistoryDTO';

export default interface ICustomerAndPurchaseHistoryDTO {
  customer: ICustomerDTO;
  purchases: ICustomersPurchasesHistoryDTO[];
}
