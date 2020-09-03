import ICustomersDTO from './ICustomersDTO';
import { ICustomerHighestPurchaseInLatestYearDTO } from './ICustomersPurchasesHistoryDTO';

export interface ICustomerResponse {
  customer: ICustomersDTO;
  purchase: ICustomerHighestPurchaseInLatestYearDTO;
}

export default interface IFindCustomerByHighestLatestYearPurchaseDTO {
  actualYear: number;
}
