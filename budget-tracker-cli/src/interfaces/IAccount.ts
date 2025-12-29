import { ITransaction } from './ITransaction';
import { ISummary } from './ISummary';

export interface IAccount {
    id: string;
    name: string;
    
    addTransaction(transaction: ITransaction): void;
    removeTransactionById(transactionId: string): boolean;
    getTransactions(): ITransaction[];
    getSummary(): ISummary;
}
