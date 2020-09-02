import ICustomersRepository from '../repositories/ICustomersRepository';

import ICustomersDTO from '../dtos/ICustomersDTO';

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute(): Promise<ICustomersDTO[]> {
    const costumers = await this.customersRepository.findAllCustomers();

    return costumers;
  }
}

export default CreateCustomerService;
