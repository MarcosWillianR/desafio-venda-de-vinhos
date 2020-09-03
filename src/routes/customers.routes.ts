import { Router } from 'express';

import CustomersRepository from '../repositories/CustomersRepository';

import ListCustomersService from '../services/ListCustomersService';
import FindCustomerWithHighestLatestYearPurchaseService from '../services/FindCustomerWithHighestLatestYearPurchaseService';

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

// cliente com maior compra única no ultimo ano.
customersRouter.get('/highest-purchase-year', async (req, res) => {
  try {
    const { actualYear } = req.query;

    const findCustomer = new FindCustomerWithHighestLatestYearPurchaseService(
      customersRepository,
    );

    const customer = await findCustomer.execute({
      actualYear: Number(actualYear),
    });

    return res.json(customer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default customersRouter;
