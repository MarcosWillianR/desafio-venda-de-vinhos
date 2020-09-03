import MockAdapter from 'axios-mock-adapter'; //eslint-disable-line

import externalAPI from '../configs/axios';

import CustomersRepository from '../repositories/CustomersRepository';
import FindMostFaithfulCustomersService from './FindMostFaithfulCustomersService';

const externalAPIMock = new MockAdapter(externalAPI);

let customersRepository: CustomersRepository;
let findMostFaithfulCustomersService: FindMostFaithfulCustomersService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    customersRepository = new CustomersRepository();
    findMostFaithfulCustomersService = new FindMostFaithfulCustomersService(
      customersRepository,
    );

    externalAPIMock.onGet('598b16861100004905515ec7').reply(200, [
      {
        codigo: '3fde36a6-c9a1-4d27-9f0f-7c12ab0d1cdd',
        data: '19-02-2014',
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
        codigo: '3fde36a6-c9a1-4d27-9f0f-7c12ab0d1c22',
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
        codigo: '4a7c9be2-5231-4dff-b8e7-9a6392867236',
        data: '22-10-2016',
        cliente: '0000.000.000.01',
        itens: [
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
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a6392867244',
        data: '22-10-2015',
        cliente: '0000.000.000.02',
        itens: [
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
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a6392867272',
        data: '22-10-2017',
        cliente: '0000.000.000.02',
        itens: [
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
      {
        codigo: '517ec2b6-1d3d-48a1-9ed4-a51e20ce18df',
        data: '15-11-2015',
        cliente: '0000.000.000.08',
        itens: [
          {
            codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
            produto: 'Casa Valduga Raízes',
            variedade: 'Merlot',
            pais: 'Brasil',
            categoria: 'Tinto',
            safra: '2013',
            preco: 211,
          },
        ],
        valorTotal: 211,
      },
      {
        codigo: '1194a8cb-b693-40dd-a3d2-23f9f343d36c',
        data: '15-09-2014',
        cliente: '0000.000.000.09',
        itens: [
          {
            codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
            produto: 'Casa Valduga Raízes',
            variedade: 'Merlot',
            pais: 'Brasil',
            categoria: 'Tinto',
            safra: '2013',
            preco: 555,
          },
        ],
        valorTotal: 555,
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
        id: 8,
        nome: 'Jonathan',
        cpf: '000.000.000-08',
      },
      {
        id: 9,
        nome: 'Matheus',
        cpf: '000.000.000-09',
      },
    ]);
  });

  it('should be able to find most faithful customers', async () => {
    const customers = await findMostFaithfulCustomersService.execute();

    expect(customers).toStrictEqual([
      {
        id: 1,
        nome: 'Vinicius',
        cpf: '000.000.000-01',
        purchasesHistory: ['19/02/2014', '19/02/2015', '22/10/2016'],
      },
      {
        id: 2,
        nome: 'Marcos',
        cpf: '000.000.000-02',
        purchasesHistory: ['22/10/2015', '22/10/2017'],
      },
      {
        id: 8,
        nome: 'Jonathan',
        cpf: '000.000.000-08',
        purchasesHistory: ['15/11/2015'],
      },
    ]);
  });
});
