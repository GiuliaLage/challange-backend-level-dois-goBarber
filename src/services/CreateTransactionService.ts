import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid.');
    }

    if (type === 'outcome' && total < value) {
      throw Error('you do not have enough balance');
    }

    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
