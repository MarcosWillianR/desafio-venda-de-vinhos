import ICustomersDTO from '../dtos/ICustomersDTO';
import ICustomersPurchasesHistoryDTO from '../dtos/ICustomersPurchasesHistoryDTO';
import IFindCustomerByHighestLatestYearPurchaseDTO, {
  ICustomerResponse,
} from '../dtos/IFindCustomerByHighestLatestYearPurchaseDTO';

export default interface ICustomersRepository {
  findAllCustomers(): Promise<ICustomersDTO[]>;
  findAllCustomersPurchasesHistory(): Promise<ICustomersPurchasesHistoryDTO[]>;
  findCustomerByHighestLatestYearPurchase(
    data: IFindCustomerByHighestLatestYearPurchaseDTO,
  ): Promise<ICustomerResponse[]>;
}
