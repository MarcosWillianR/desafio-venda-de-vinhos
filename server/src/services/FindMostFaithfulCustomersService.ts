import ICustomersRepository from '../repositories/ICustomersRepository';

import IMostFaithfulCustomerDTO from '../dtos/IMostFaithfulCustomerDTO';

class FindMostFaithfulCustomersService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute(): Promise<IMostFaithfulCustomerDTO[]> {
    const customersAndPurchasesHistory = await this.customersRepository.findCustomersAndPurchasesHistory();

    const mostFaithfulCustomers = customersAndPurchasesHistory.map(
      customerAndPurchase => {
        const purchasesHistory: string[] = [];

        customerAndPurchase.purchases.forEach(purchase => {
          const formattedDate = purchase.data.replace(/-/g, '/');

          const sameDate = purchasesHistory.find(
            date => date === formattedDate,
          );

          if (!sameDate) {
            purchasesHistory.push(formattedDate);
          }
        });

        const { id, nome, cpf } = customerAndPurchase.customer;

        return {
          id,
          nome,
          cpf,
          purchasesHistory,
        };
      },
    );

    const orderByPurchasesHistory = mostFaithfulCustomers
      .sort((a, b) => {
        if (a.purchasesHistory.length < b.purchasesHistory.length) {
          return -1;
        }
        if (a.purchasesHistory.length > b.purchasesHistory.length) {
          return 1;
        }
        return 0;
      })
      .reverse();

    let firstThreeCustomers: IMostFaithfulCustomerDTO[] = [];

    if (orderByPurchasesHistory.length >= 2) {
      firstThreeCustomers = [
        orderByPurchasesHistory[0],
        orderByPurchasesHistory[1],
        orderByPurchasesHistory[2],
      ];
    } else {
      firstThreeCustomers = orderByPurchasesHistory;
    }

    return firstThreeCustomers;
  }
}

export default FindMostFaithfulCustomersService;
