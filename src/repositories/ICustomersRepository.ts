import ICustomersDTO from '../dtos/ICustomersDTO';
import ICustomersPurchasesHistoryDTO from '../dtos/ICustomersPurchasesHistoryDTO';

export default interface ICustomersRepository {
  findAllCustomers(): Promise<ICustomersDTO[]>;
  findAllCustomersPurchasesHistory(): Promise<ICustomersPurchasesHistoryDTO[]>;
}
