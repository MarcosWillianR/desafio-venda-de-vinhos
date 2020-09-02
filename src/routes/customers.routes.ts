import { Router } from 'express';

import CustomersRepository from '../repositories/CustomersRepository';
import ListCustomersService from '../services/ListCustomersService';

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

export default customersRouter;
