import { Router } from 'express';

import CustomersRepository from '../repositories/CustomersRepository';

import ListCustomersService from '../services/ListCustomersService';
import FindCustomerWithHighestLatestYearPurchaseService from '../services/FindCustomerWithHighestLatestYearPurchaseService';
import FindMostFaithfulCustomersService from '../services/FindMostFaithfulCustomersService';
import FindWineRecommendationsForCustomersService from '../services/FindWineRecommendationsForCustomersService';

const customersRouter = Router();
const customersRepository = new CustomersRepository();

customersRouter.get('/', async (req, res) => {
  try {
    const listCustomers = new ListCustomersService(customersRepository);

    const customers = await listCustomers.execute();

    return res.json(customers);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

customersRouter.get('/highest-purchase-year', async (req, res) => {
  try {
    const { actualYear } = req.query;

    const findCustomers = new FindCustomerWithHighestLatestYearPurchaseService(
      customersRepository,
    );

    const customers = await findCustomers.execute({
      actualYear: Number(actualYear),
    });

    return res.json(customers);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

customersRouter.get('/most-faithful', async (req, res) => {
  try {
    const findFaithfulCustomers = new FindMostFaithfulCustomersService(
      customersRepository,
    );

    const customers = await findFaithfulCustomers.execute();

    return res.json(customers);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

customersRouter.get('/wines/recommendations', async (req, res) => {
  try {
    const { customerCpf } = req.query;

    const wineRecommendations = new FindWineRecommendationsForCustomersService(
      customersRepository,
    );

    const wines = await wineRecommendations.execute({
      customerCpf: String(customerCpf),
    });

    return res.json(wines);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default customersRouter;
