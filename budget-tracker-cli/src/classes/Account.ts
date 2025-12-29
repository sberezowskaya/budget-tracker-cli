import { Transaction } from './Transaction';
import { v4 as uuidv4 } from 'uuid';

export class Account {
    private _transactions: Transaction[] = [];
    public readonly id: string;

    constructor(
        public name: string
    ) {
        this.id = uuidv4();
    }

    get income(): number {
        return this._transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    get expenses(): number {
        return this._transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    get balance(): number {
        return this.income - this.expenses;
    }

    addTransaction(transaction: Transaction): void {
        this._transactions.push(transaction);
    }

    removeTransactionById(transactionId: string): boolean {
        const initialLength = this._transactions.length;
        this._transactions = this._transactions.filter(t => t.id !== transactionId);
        return initialLength > this._transactions.length;
    }

    getTransactions(): Transaction[] {
        return [...this._transactions];
    }

    getSummary() {
        return {
            income: this.income,
            expenses: this.expenses,
            balance: this.balance
        };
    }
}