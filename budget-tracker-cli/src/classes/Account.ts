import { IAccount } from '../interfaces/IAccount.js';
import { ISummary } from '../interfaces/ISummary.js';
import { Transaction } from './Transaction.js';
import { AccountUpdate } from '../interfaces/utility-types.js';
import { v4 as uuidv4 } from 'uuid';

export class Account implements IAccount {
    private _transactions: Transaction[] = [];
    public id: string;
    public name: string; 

    constructor(
        name: string
    ) {
        this.id = uuidv4();
        this.name = name;
    }

    // Метод для обновления счёта
    update(update: AccountUpdate): void {
        if (update.name !== undefined) {
            this.name = update.name;
        }
    }

    // Геттеры
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

    get transactions(): Transaction[] {
        return [...this._transactions];
    }

    // Методы интерфейса IAccount
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

    getSummary(): ISummary {
        return {
            income: this.income,
            expenses: this.expenses,
            balance: this.balance
        };
    }

    // Получение информации о счёте
    getInfo(): { id: string; name: string } {
        return {
            id: this.id,
            name: this.name
        };
    }
}