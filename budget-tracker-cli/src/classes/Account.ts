import { IAccount, ITransaction, ISummary } from '../interfaces/index.js';
import { Transaction } from './Transaction.js';
import { AccountUpdate } from '../interfaces/utility-types.js';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { escapeCsvValue } from '../utils/escapeCsvValue.js';

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

    getInfo(): { id: string; name: string } {
        return {
            id: this.id,
            name: this.name
        };
    }

    async exportTransactionsToCSV(filename: string): Promise<void> {
        try {
            console.log(`Начинаю экспорт транзакций в файл: ${filename}`);
            
            // 1.  CSV строка
            const csvString = this.generateCSV();
            
            // 2. путь к файлу
            const filePath = path.resolve(filename);
            
            // 3. файл асинхронно
            await fs.writeFile(filePath, csvString, 'utf-8');
            
            console.log(`Успешно экспортировано ${this._transactions.length} транзакций в ${filename}`);
        } catch (error) {
            console.error(`Ошибка при экспорте в CSV:`, error);
            throw new Error(`Не удалось экспортировать транзакции: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        }
    }

    private generateCSV(): string {
        // Заголовки CSV
        const headers = ['id', 'amount', 'type', 'date', 'description'];
        const escapedHeaders = headers.map(escapeCsvValue).join(',');
        
        // Данные транзакций
        const rows = this._transactions.map(transaction => {
            const row = [
                transaction.id,
                transaction.amount,
                transaction.type,
                transaction.date,
                transaction.description
            ];
            return row.map(escapeCsvValue).join(',');
        });
        
        // заголовки и данные
        return [escapedHeaders, ...rows].join('\n');
    }


    async getTransactionStats(): Promise<{
        total: number;
        income: number;
        expenses: number;
        count: number;
        average: number;
    }> {
        return new Promise((resolve) => {
            // Имитация асинхронной операции
            setTimeout(() => {
                const income = this.income;
                const expenses = this.expenses;
                const total = this.balance;
                const count = this._transactions.length;
                const average = count > 0 ? (income + expenses) / count : 0;
                
                resolve({
                    total,
                    income,
                    expenses,
                    count,
                    average
                });
            }, 100); 
        });
    }
}