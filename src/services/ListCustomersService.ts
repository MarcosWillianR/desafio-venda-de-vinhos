import ICustomersRepository from '../repositories/ICustomersRepository';

import ICustomersDTO from '../dtos/ICustomersDTO';

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute(): Promise<ICustomersDTO[]> {
    const customers = await this.customersRepository.findAllCustomers();

    return customers;
  }
}

export default CreateCustomerService;
