import { ITransaction } from './ITransaction.js';
import { ISummary } from './ISummary.js';

export interface IAccount {
    id: string;
    name: string;
    transactions?: ITransaction[];
    
    addTransaction(transaction: ITransaction): void;
    removeTransactionById(transactionId: string): boolean;
    getTransactions(): ITransaction[];
    getSummary(): ISummary;
}
