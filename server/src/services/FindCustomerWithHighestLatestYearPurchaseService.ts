import ICustomersRepository from '../repositories/ICustomersRepository';

import { ICustomerResponse } from '../dtos/IFindCustomerByHighestLatestYearPurchaseDTO';

interface IRequestDTO {
  actualYear: number;
}

class FindCustomerWithHighestLatestYearPurchaseService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({
    actualYear,
  }: IRequestDTO): Promise<ICustomerResponse[]> {
    const customer = await this.customersRepository.findCustomerByHighestLatestYearPurchase(
      { actualYear },
    );

    return customer;
  }
}

export default FindCustomerWithHighestLatestYearPurchaseService;
