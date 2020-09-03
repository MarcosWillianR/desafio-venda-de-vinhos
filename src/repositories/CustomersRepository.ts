import { subYears } from 'date-fns';

import externalAPI from '../configs/axios';

import ICustomersDTO from '../dtos/ICustomersDTO';
import ICustomersPurchasesHistoryDTO, {
  ICustomerHighestPurchaseInLatestYearDTO,
} from '../dtos/ICustomersPurchasesHistoryDTO';
import IFindCustomerByHighestLatestYearPurchaseDTO, {
  ICustomerResponse,
} from '../dtos/IFindCustomerByHighestLatestYearPurchaseDTO';

import ICustomersRepository from './ICustomersRepository';

import { cpfFormatter } from '../utils';

class FakeCustomersRepository implements ICustomersRepository {
  public async findAllCustomersPurchasesHistory(): Promise<
    ICustomersPurchasesHistoryDTO[]
  > {
    const { data: responseData } = await externalAPI.get<
      ICustomersPurchasesHistoryDTO[]
    >('598b16861100004905515ec7');

    return responseData;
  }

  public async findAllCustomers(): Promise<ICustomersDTO[]> {
    const customersPurchasesHistory = await this.findAllCustomersPurchasesHistory();
    const { data: customers } = await externalAPI.get<ICustomersDTO[]>(
      '598b16291100004705515ec5',
    );

    const formattedcustomers = customers.map(customer => ({
      ...customer,
      cpf: customer.cpf.replace(/[^\d]/g, ''),
    }));

    const formattedCustomersPurchases = customersPurchasesHistory.map(
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

    const formattedCustomersTotalValue = formattedcustomers.map(customer => {
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

  public async findCustomerByHighestLatestYearPurchase({
    actualYear,
  }: IFindCustomerByHighestLatestYearPurchaseDTO): Promise<
    ICustomerResponse[]
  > {
    const actualDate = new Date(actualYear, 0);
    const subtractedDateYear = subYears(actualDate, 1);

    const customers = await this.findAllCustomers();
    const formattedcustomers = customers.map(customer => ({
      ...customer,
      cpf: customer.cpf.replace(/[^\d]/g, ''),
    }));
    const customerPurchases = await this.findAllCustomersPurchasesHistory();
    const customerPurchasesByLatestYear = customerPurchases.filter(
      customerPurchase =>
        customerPurchase.data.split('-')[2] ===
        String(subtractedDateYear.getFullYear()),
    );

    const allYearItemPurchaseValues: number[] = [];

    customerPurchasesByLatestYear.forEach(customerPurchase =>
      customerPurchase.itens.forEach(item =>
        allYearItemPurchaseValues.push(item.preco),
      ),
    );

    const highestItemPurchaseValue = Math.max(...allYearItemPurchaseValues);

    const highestYearPurchaseFormatted: ICustomerResponse[] = [];

    customerPurchasesByLatestYear.forEach(customerPurchase => {
      const { itens, cliente, data, codigo } = customerPurchase;
      const formattedClientCpf = cliente.replace(/[^\d]/g, '');
      const removeUnuselessClientCpfChars = formattedClientCpf.slice(
        formattedClientCpf.length - 11,
        formattedClientCpf.length,
      );

      const highestItemPurchase = itens.find(
        item => item.preco === highestItemPurchaseValue,
      );

      const customer = formattedcustomers.find(
        formattedCustomer =>
          formattedCustomer.cpf === removeUnuselessClientCpfChars,
      );

      if (!customer) {
        throw new Error('Customer not found');
      }

      const { id, cpf, nome } = customer;

      if (highestItemPurchase) {
        if (itens.includes(highestItemPurchase)) {
          highestYearPurchaseFormatted.push({
            customer: {
              id,
              cpf: cpfFormatter(cpf),
              nome,
            },
            purchase: {
              cliente: cpfFormatter(removeUnuselessClientCpfChars),
              data,
              codigo,
              item: highestItemPurchase,
            },
          });
        }
      }
    });

    return highestYearPurchaseFormatted;
  }
}

export default FakeCustomersRepository;
