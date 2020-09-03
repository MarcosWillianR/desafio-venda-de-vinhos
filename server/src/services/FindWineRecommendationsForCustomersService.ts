import ICustomersRepository from '../repositories/ICustomersRepository';

import IWineRecommendationsDTO, {
  IRecommendation,
  IRecommendationWithTimesBought,
} from '../dtos/IWineRecommendationsDTO';

interface ICategoryTimesBought {
  category: string;
  timesBought: number;
}

interface IRequestDTO {
  customerCpf: string;
}

class FindWineRecommendationsForCustomersService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({
    customerCpf,
  }: IRequestDTO): Promise<IWineRecommendationsDTO> {
    const customers = await this.customersRepository.findCustomersAndPurchasesHistory();

    const WineRecommendations: IWineRecommendationsDTO[] = [];

    customers.forEach(({ customer, purchases }) => {
      const recommendations: IRecommendation[] = [];
      const categoryTimesBought: ICategoryTimesBought[] = [];

      const purchasesFormatted = purchases.reduce((acc, customerPurchase) => {
        customerPurchase.itens.forEach(item => {
          const sameProduct = acc.find(
            existentItemInArray => existentItemInArray.produto === item.produto,
          );

          const sameProductIndex = acc.findIndex(
            existentItemInArray => existentItemInArray.produto === item.produto,
          );

          if (sameProduct) {
            acc[sameProductIndex].vezesComprado += 1;
          } else {
            acc.push({ ...item, vezesComprado: 1 });
          }
        });

        return acc;
      }, [] as IRecommendation[]);

      recommendations.push(...purchasesFormatted);

      const categoryTimesBoughtFormatted = purchases.reduce(
        (acc, customerPurchase) => {
          customerPurchase.itens.forEach(item => {
            const sameCategory = acc.find(
              ({ category }) => category === item.categoria,
            );
            const sameCategoryIndex = acc.findIndex(
              ({ category }) => category === item.categoria,
            );

            if (sameCategory) {
              acc[sameCategoryIndex].timesBought += 1;
            } else {
              acc.push({
                category: item.categoria,
                timesBought: 1,
              });
            }
          });

          return acc;
        },
        [] as ICategoryTimesBought[],
      );

      categoryTimesBought.push(...categoryTimesBoughtFormatted);

      const recommendationsWithCategoryTimesBought: IRecommendationWithTimesBought[] = [];

      recommendations.forEach(recommendation => {
        const categoryTimesPurchase = categoryTimesBought.find(
          ({ category }) => category === recommendation.categoria,
        );

        if (!categoryTimesPurchase) {
          throw new Error(
            `Categoria ${recommendation.categoria} não encontrada`,
          );
        }

        recommendationsWithCategoryTimesBought.push({
          ...recommendation,
          vezesCompradoCategoria: categoryTimesPurchase.timesBought,
        });
      });

      WineRecommendations.push({
        customer,
        recommendations: recommendationsWithCategoryTimesBought,
      });
    });

    const customerRecommendation = WineRecommendations.find(
      recommendation => recommendation.customer.cpf === customerCpf,
    );

    if (!customerRecommendation) {
      throw new Error('Customer not found');
    }

    const formattedCustomerRecommendations = customerRecommendation.recommendations.reduce(
      (acc, recomendation) => {
        const sameProduct = acc.find(
          product => product.produto === recomendation.produto,
        );

        if (!sameProduct) {
          acc.push(recomendation);
        }

        return acc;
      },
      [] as IRecommendationWithTimesBought[],
    );

    const recommendationOrdered = formattedCustomerRecommendations
      .sort((a, b) => {
        if (
          a.vezesCompradoCategoria < b.vezesCompradoCategoria ||
          a.vezesComprado < b.vezesComprado
        ) {
          return -1;
        }

        if (
          a.vezesCompradoCategoria > b.vezesCompradoCategoria ||
          a.vezesComprado > b.vezesComprado
        ) {
          return 1;
        }
        return 0;
      })
      .reverse();

    const formattedRecommendations: IRecommendationWithTimesBought[] = [];

    if (recommendationOrdered.length >= 5) {
      formattedRecommendations.push(
        recommendationOrdered[0],
        recommendationOrdered[1],
        recommendationOrdered[2],
        recommendationOrdered[3],
        recommendationOrdered[4],
      );
    } else {
      formattedRecommendations.push(...recommendationOrdered);
    }

    return {
      customer: customerRecommendation.customer,
      recommendations: formattedRecommendations,
    };
  }
}

export default FindWineRecommendationsForCustomersService;
