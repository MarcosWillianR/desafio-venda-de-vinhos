import MockAdapter from 'axios-mock-adapter'; //eslint-disable-line

import externalAPI from '../configs/axios';

import CustomersRepository from '../repositories/CustomersRepository';
import FindWineRecommendationsForCustomersService from './FindWineRecommendationsForCustomersService';

const externalAPIMock = new MockAdapter(externalAPI);

let customersRepository: CustomersRepository;
let findWineRecommendationsForCustomersService: FindWineRecommendationsForCustomersService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    customersRepository = new CustomersRepository();
    findWineRecommendationsForCustomersService = new FindWineRecommendationsForCustomersService(
      customersRepository,
    );

    externalAPIMock.onGet('598b16861100004905515ec7').reply(200, [
      {
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
        data: '22-10-2016',
        cliente: '0000.000.000.01',
        itens: [
          {
            produto: 'Casa Silva Reserva',
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
        cliente: '0000.000.000.01',
        itens: [
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Petit Verdot',
            pais: 'Chile',
            categoria: 'Suave',
            safra: '2009',
            preco: 121,
          },
        ],
        valorTotal: 200,
      },
      {
        codigo: '4a7c9be2-5231-4dff-b8e7-9a6392867272',
        data: '22-10-2017',
        cliente: '0000.000.000.01',
        itens: [
          {
            produto: 'Casa Silva Gran Reserva',
            variedade: 'Petit Verdot',
            pais: 'Chile',
            categoria: 'Suave',
            safra: '2009',
            preco: 121,
          },
        ],
        valorTotal: 200,
      },
      {
        codigo: '517ec2b6-1d3d-48a1-9ed4-a51e20ce18df',
        data: '15-11-2015',
        cliente: '0000.000.000.01',
        itens: [
          {
            codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
            produto: 'Casa Valduga Raízes',
            variedade: 'Merlot',
            pais: 'Brasil',
            categoria: 'Suave',
            safra: '2013',
            preco: 211,
          },
        ],
        valorTotal: 211,
      },
      {
        codigo: '1194a8cb-b693-40dd-a3d2-23f9f343d36c',
        data: '15-09-2014',
        cliente: '0000.000.000.01',
        itens: [
          {
            codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
            produto: 'Casa Valduga Seco',
            variedade: 'Merlot',
            pais: 'Brasil',
            categoria: 'Seco',
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
    ]);
  });

  it('should be able to find customer wine recommendations', async () => {
    const wineRecommendations = await findWineRecommendationsForCustomersService.execute(
      {
        customerCpf: '000.000.000-01',
      },
    );

    expect(wineRecommendations).toStrictEqual({
      customer: {
        id: 1,
        nome: 'Vinicius',
        valorTotal: 1524,
        cpf: '000.000.000-01',
      },
      recommendations: [
        {
          produto: 'Casa Silva Reserva',
          variedade: 'Cabernet Sauvignon',
          pais: 'Chile',
          categoria: 'Tinto',
          safra: '2014',
          preco: 79,
          vezesComprado: 3,
          vezesCompradoCategoria: 3,
        },
        {
          produto: 'Casa Silva Gran Reserva',
          variedade: 'Petit Verdot',
          pais: 'Chile',
          categoria: 'Suave',
          safra: '2009',
          preco: 121,
          vezesComprado: 2,
          vezesCompradoCategoria: 3,
        },
        {
          codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
          produto: 'Casa Valduga Raízes',
          variedade: 'Merlot',
          pais: 'Brasil',
          categoria: 'Suave',
          safra: '2013',
          preco: 211,
          vezesComprado: 1,
          vezesCompradoCategoria: 3,
        },
        {
          codigo: 'e9eee4af-13d0-4da1-9a91-36b100e1c98e',
          produto: 'Casa Valduga Seco',
          variedade: 'Merlot',
          pais: 'Brasil',
          categoria: 'Seco',
          safra: '2013',
          preco: 555,
          vezesComprado: 1,
          vezesCompradoCategoria: 1,
        },
      ],
    });
  });
});
