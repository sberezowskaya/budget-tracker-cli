import { IAccount, ITransaction, ISummary } from '../interfaces/index.js';
import { Transaction } from './Transaction.js';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { escapeCsvValue } from '../utils/escapeCsvValue.js';

export class Account implements IAccount {
    private _transactions: Transaction[] = [];
    public id: string;
    public name: string;

    constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
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

    get transactions(): Transaction[] {
        return [...this._transactions];
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

    getSummary(): ISummary {
        return {
            income: this.income,
            expenses: this.expenses,
            balance: this.balance
        };
    }

    getSummaryString(): string {
        const summary = this.getSummary();
        return `Счёт: "${this.name}" | Баланс: ${summary.balance} руб.`;
    }

    async exportTransactionsToCSV(filename: string): Promise<void> {
        try {
            const csvString = this.generateCSV();
            const filePath = path.resolve(filename);
            await fs.writeFile(filePath, csvString, 'utf-8');
        } catch (error) {
            throw new Error(`Не удалось экспортировать: ${error instanceof Error ? error.message : 'Ошибка'}`);
        }
    }

    private generateCSV(): string {
        const headers = ['id', 'amount', 'type', 'date', 'description'];
        const escapedHeaders = headers.map(escapeCsvValue).join(',');
        
        const rows = this._transactions.map(transaction => {
            const row = [
                transaction.id.substring(0, 8), // Обрезаем ID для читаемости
                transaction.amount,
                transaction.type,
                transaction.date,
                transaction.description
            ];
            return row.map(escapeCsvValue).join(',');
        });
        
        return [escapedHeaders, ...rows].join('\n');
    }
}