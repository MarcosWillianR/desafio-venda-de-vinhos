import MockAdapter from 'axios-mock-adapter'; //eslint-disable-line

import externalAPI from '../configs/axios';

import CustomersRepository from '../repositories/CustomersRepository';
import FindCustomerWithHighestLatestYearPurchaseService from './FindCustomerWithHighestLatestYearPurchaseService';

const externalAPIMock = new MockAdapter(externalAPI);

let customersRepository: CustomersRepository;
let findCustomerWithHighestLatestYearPurchase: FindCustomerWithHighestLatestYearPurchaseService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    customersRepository = new CustomersRepository();
    findCustomerWithHighestLatestYearPurchase = new FindCustomerWithHighestLatestYearPurchaseService(
      customersRepository,
    );

    externalAPIMock.onGet('598b16861100004905515ec7').reply(200, [
      {
        codigo: '3fde36a6-c9a1-4d27-9f0f-7c12ab0d1cdd',
        data: '19-02-2016',
        cliente: '000.000.000.01',
        itens: [
          {
            produto: 'Casa Silva Reserva',
            variedade: 'Cabernet Sauvignon',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2014',
            preco: 79,
          },
        ],
        valorTotal: 79,
      },
      {
        codigo: '3fde36a6-c9a1-4d27-9f0f-7c12ab0d1cdd',
        data: '19-02-2015',
        cliente: '000.000.000.01',
        itens: [
          {
            produto: 'Casa Silva Reserva',
            variedade: 'Cabernet Sauvignon',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2014',
            preco: 500,
          },
        ],
        valorTotal: 79,
      },
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a639286726e',
        data: '22-10-2016',
        cliente: '0000.000.000.02',
        itens: [
          {
            produto: 'Casa Silva Reserva',
            variedade: 'Chardonnay',
            pais: 'Chile',
            categoria: 'Branco',
            safra: '2016',
            preco: 79,
          },
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Petit Verdot',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2009',
            preco: 121,
          },
        ],
        valorTotal: 200,
      },
    ]);

    externalAPIMock.onGet('598b16291100004705515ec5').reply(200, [
      {
        id: 1,
        nome: 'Vinicius',
        cpf: '000.000.000-01',
      },
      {
        id: 2,
        nome: 'Marcos',
        cpf: '000.000.000-02',
      },
    ]);
  });

  it('must be able to find customer with highest latest year purchase', async () => {
    const customers = await findCustomerWithHighestLatestYearPurchase.execute({
      actualYear: 2017,
    });

    expect(customers).toStrictEqual([
      {
        customer: {
          id: 2,
          nome: 'Marcos',
          cpf: '000.000.000-02',
        },
        purchase: {
          codigo: '4a7c9be2-5231-4dff-b8e7-9a639286726e',
          data: '22-10-2016',
          cliente: '000.000.000-02',
          item: {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Petit Verdot',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2009',
            preco: 121,
          },
        },
      },
    ]);
  });
});
