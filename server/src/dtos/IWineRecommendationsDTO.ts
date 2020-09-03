import ICustomersDTO from './ICustomersDTO';
import { ICustomersPurchasesHistoryItem } from './ICustomersPurchasesHistoryDTO';

export interface IRecommendation extends ICustomersPurchasesHistoryItem {
  vezesComprado: number;
}

export interface IRecommendationWithTimesBought extends IRecommendation {
  vezesCompradoCategoria: number;
}

export default interface IWineRecommendationsDTO {
  customer: ICustomersDTO;
  recommendations: IRecommendationWithTimesBought[];
}
