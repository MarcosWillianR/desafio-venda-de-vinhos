import ICustomersDTO from '../dtos/ICustomersDTO';
import ICustomersPurchasesHistoryDTO from '../dtos/ICustomersPurchasesHistoryDTO';
import IFindCustomerByHighestLatestYearPurchaseDTO, {
  ICustomerResponse,
} from '../dtos/IFindCustomerByHighestLatestYearPurchaseDTO';
import ICustomerAndPurchaseHistoryDTO from '../dtos/ICustomerAndPurchaseHistoryDTO';

export default interface ICustomersRepository {
  findAllCustomers(): Promise<ICustomersDTO[]>;
  findAllCustomersPurchasesHistory(): Promise<ICustomersPurchasesHistoryDTO[]>;
  findCustomerByHighestLatestYearPurchase(
    data: IFindCustomerByHighestLatestYearPurchaseDTO,
  ): Promise<ICustomerResponse[]>;
  findCustomersAndPurchasesHistory(): Promise<ICustomerAndPurchaseHistoryDTO[]>;
}
