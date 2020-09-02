import externalAPI from '../configs/axios';

import ICustomersDTO from '../dtos/ICustomersDTO';
import ICustomersPurchasesHistoryDTO from '../dtos/ICustomersPurchasesHistoryDTO';

import ICustomersRepository from './ICustomersRepository';

import { cpfFormatter } from '../utils';

class FakeCustomersRepository implements ICustomersRepository {
  private customersRepository: ICustomersDTO[] = [];

  public async findAllCustomersPurchasesHistory(): Promise<
    ICustomersPurchasesHistoryDTO[]
  > {
    const { data: responseData } = await externalAPI.get<
      ICustomersPurchasesHistoryDTO[]
    >('598b16861100004905515ec7');

    return responseData;
  }

  public async findAllCustomers(): Promise<ICustomersDTO[]> {
    const costumersPurchasesHistory = await this.findAllCustomersPurchasesHistory();
    const { data: costumers } = await await externalAPI.get<ICustomersDTO[]>(
      '598b16291100004705515ec5',
    );

    const formattedCostumers = costumers.map(costumer => ({
      ...costumer,
      cpf: costumer.cpf.replace(/[^\d]/g, ''),
    }));

    const formattedCustomersPurchases = costumersPurchasesHistory.map(
      customerHistory => {
        const formattedClientCpf = customerHistory.cliente.replace(
          /[^\d]/g,
          '',
        );
        const clientCpfLength = formattedClientCpf.length;

        return {
          cliente: formattedClientCpf.slice(
            clientCpfLength - 11,
            clientCpfLength,
          ),
          valorTotal: customerHistory.valorTotal,
        };
      },
    );

    const formattedCustomersTotalValue = formattedCostumers.map(customer => {
      const customersPurchases = formattedCustomersPurchases
        .filter(customerPurchase => customerPurchase.cliente === customer.cpf)
        .reduce(
          (acc, curr) => {
            acc.valorTotal += curr.valorTotal;

            return acc;
          },
          { valorTotal: 0 },
        );

      return {
        ...customer,
        cpf: cpfFormatter(customer.cpf),
        valorTotal: customersPurchases.valorTotal,
      };
    });

    const customersOrderedByHighestTotalValue = formattedCustomersTotalValue
      .sort((a, b) => {
        if (a.valorTotal < b.valorTotal) {
          return -1;
        }
        if (a.valorTotal > b.valorTotal) {
          return 1;
        }
        return 0;
      })
      .reverse();

    return customersOrderedByHighestTotalValue;
  }
}

export default FakeCustomersRepository;
