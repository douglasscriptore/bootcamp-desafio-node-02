import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    const transcation = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transcation;
  }
}

export default CreateTransactionService;