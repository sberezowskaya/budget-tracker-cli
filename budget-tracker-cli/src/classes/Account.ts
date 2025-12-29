import { IAccount, ITransaction, ISummary } from '../interfaces/index.js';
import { Transaction } from './Transaction.js';
import { AccountUpdate } from '../interfaces/utility-types.js';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { escapeCsvValue } from '../utils/escapeCsvValue.js';

// Импортировать декораторы
import { LogClass } from '../decorators/LogClass.js';
import { LogMethod } from '../decorators/LogMethod.js';
import { ReadOnly } from '../decorators/ReadOnly.js';
import { Description, getMetadata } from '../decorators/Metadata.js';
import '../decorators/reflect-metadata.js';

@LogClass
export class Account implements IAccount {
    private _transactions: Transaction[] = [];
    
    @ReadOnly
    public id: string;
    
    @ReadOnly
    public name: string;
    
    @Description('Массив транзакций счета')
    private get transactionsProperty() {
        return this._transactions;
    }

    constructor(
        name: string
    ) {
        this.id = uuidv4();
        this.name = name;
    }

    update(update: AccountUpdate): void {
        if (update.name !== undefined) {
            console.log(`Попытка изменить имя счета с "${this.name}" на "${update.name}" (игнорируется)`);
        }
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

    @LogMethod
    addTransaction(transaction: Transaction): void {
        this._transactions.push(transaction);
    }

    @LogMethod
    removeTransactionById(transactionId: string): boolean {
        const initialLength = this._transactions.length;
        this._transactions = this._transactions.filter(t => t.id !== transactionId);
        return initialLength > this._transactions.length;
    }

    @LogMethod
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
            console.log(`Экспорт транзакций в файл: ${filename}`);
            
            const csvString = this.generateCSV();
            const filePath = path.resolve(filename);
            
            await fs.writeFile(filePath, csvString, 'utf-8');
            
            console.log(`Успешно экспортировано ${this._transactions.length} транзакций в ${filename}`);
        } catch (error) {
            console.error(`Ошибка при экспорте в CSV:`, error);
            throw new Error(`Не удалось экспортировать транзакции: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        }
    }

    private generateCSV(): string {
        const headers = ['id', 'amount', 'type', 'date', 'description'];
        const escapedHeaders = headers.map(escapeCsvValue).join(',');
        
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

    getSummaryString(): string {
        // Получить метаданные для свойства transactions
        const transactionsDescription = getMetadata(
            Account.prototype, 
            'transactionsProperty', 
            'metadata:description'
        ) || 'транзакции';
        
        const summary = this.getSummary();
        return `Счёт: "${this.name}" | Баланс: ${summary.balance} | Доходы: ${summary.income} | Расходы: ${summary.expenses} | ${transactionsDescription}: ${this._transactions.length}`;
    }
}