import MockAdapter from 'axios-mock-adapter'; //eslint-disable-line

import externalAPI from '../configs/axios';

import CustomersRepository from '../repositories/CustomersRepository';
import ListCustomersService from './ListCustomersService';

const externalAPIMock = new MockAdapter(externalAPI);

let customersRepository: CustomersRepository;
let listCustomers: ListCustomersService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    customersRepository = new CustomersRepository();
    listCustomers = new ListCustomersService(customersRepository);

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
          {
            produto: 'Casa Silva Reserva',
            variedade: 'Carménère',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2014',
            preco: 79,
          },
        ],
        valorTotal: 158,
      },
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a639286726e',
        data: '22-10-2015',
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
            produto: 'Casa Silva Reserva',
            variedade: 'Sauvignon Blanc',
            pais: 'Chile',
            categoria: 'Branco',
            safra: '2015',
            preco: 79,
          },
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Petit Verdot',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2009',
            preco: 120,
          },
        ],
        valorTotal: 278,
      },
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a639286726e',
        data: '20-08-2014',
        cliente: '0000.000.000.03',
        itens: [
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Syrah',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2009',
            preco: 120,
          },
          {
            produto: 'Punto Final Etiqueta Negra',
            variedade: 'Malbec',
            pais: 'Argentina',
            categoria: 'Tinto',
            safra: '2012',
            preco: 59.9,
          },
          {
            produto: 'Punto Final',
            variedade: 'Sauvignon Blanc',
            pais: 'Argentina',
            categoria: 'Branco',
            safra: '2015',
            preco: 59.9,
          },
          {
            produto: 'Punto Final',
            variedade: 'Malbec',
            pais: 'Argentina',
            categoria: 'Rosé',
            safra: '2016',
            preco: 59.9,
          },
        ],
        valorTotal: 297.7,
      },
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a639286726e',
        data: '20-08-2014',
        cliente: '0000.000.000.03',
        itens: [
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Syrah',
            pais: 'Chile',
            categoria: 'Tinto',
            safra: '2009',
            preco: 120,
          },
        ],
        valorTotal: 120,
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
      {
        id: 3,
        nome: 'Joel',
        cpf: '000.000.000-03',
      },
    ]);
  });

  it('must be able to list customers based on the highest total purchase value', async () => {
    const customers = await listCustomers.execute();

    expect(customers).toStrictEqual([
      {
        id: 3,
        nome: 'Joel',
        cpf: '000.000.000-03',
        valorTotal: 417.7,
      },
      {
        id: 2,
        nome: 'Marcos',
        cpf: '000.000.000-02',
        valorTotal: 278,
      },
      {
        id: 1,
        nome: 'Vinicius',
        cpf: '000.000.000-01',
        valorTotal: 158,
      },
    ]);
  });
});
