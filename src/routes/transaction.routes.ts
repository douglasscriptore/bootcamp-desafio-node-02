import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    // inicia o service e passa pra ele nosso repositorio
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // executa nosso service para criar a transação
    const transcation = createTransaction.execute({ title, value, type });

    return response.json(transcation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
