import { ITransaction, TransactionType, ISummary, IAccount, IAccountManager } from './types';

// 1. Класс Transaction
export class Transaction implements ITransaction {
    constructor(
        public id: number,
        public amount: number,
        public type: TransactionType,
        public date: string,
        public description: string
    ) {}

    toString(): string {
        const sign = this.type === 'income' ? '+' : '-';
        return `[${this.date}] ${sign}${this.amount} руб. - ${this.description} (ID: ${this.id})`;
    }
}

// 2. Класс Account
export class Account implements IAccount {
    private _transactions: Transaction[] = [];

    constructor(
        public id: number,
        public name: string
    ) {}

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
        return [...this._transactions]; // Возвращаем копию для инкапсуляции
    }

    // Методы
    addTransaction(transaction: Transaction): void {
        this._transactions.push(transaction);
    }

    removeTransactionById(transactionId: number): boolean {
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
        return `Счёт: "${this.name}" | Баланс: ${summary.balance} руб. | Доходы: ${summary.income} руб. | Расходы: ${summary.expenses} руб. | Транзакций: ${this._transactions.length}`;
    }

    toString(): string {
        let result = `=== Счёт: ${this.name} (ID: ${this.id}) ===\n`;
        result += `Баланс: ${this.balance} руб.\n`;
        result += `Транзакций: ${this._transactions.length}\n`;
        
        if (this._transactions.length > 0) {
            result += "\nПоследние транзакции:\n";
            const recentTransactions = this._transactions.slice(-5).reverse();
            recentTransactions.forEach(transaction => {
                result += `  ${transaction.toString()}\n`;
            });
        }
        
        return result;
    }
}

// 3. Класс AccountManager
export class AccountManager implements IAccountManager {
    private _accounts: Account[] = [];

    // Геттеры
    get income(): number {
        return this._accounts.reduce((sum, account) => sum + account.income, 0);
    }

    get expenses(): number {
        return this._accounts.reduce((sum, account) => sum + account.expenses, 0);
    }

    get balance(): number {
        return this.income - this.expenses;
    }

    get accounts(): Account[] {
        return [...this._accounts]; // Возвращаем копию для инкапсуляции
    }

    // Методы из интерфейса IAccountManager
    addAccount(account: Account): void {
        this._accounts.push(account);
    }

    removeAccountById(accountId: number): boolean {
        const initialLength = this._accounts.length;
        this._accounts = this._accounts.filter(a => a.id !== accountId);
        return initialLength > this._accounts.length;
    }

    getAccounts(): Account[] {
        return [...this._accounts];
    }

    getAccountById(id: number): Account | undefined {
        return this._accounts.find(account => account.id === id);
    }

    getSummary(accountId: number): ISummary {
        const account = this.getAccountById(accountId);
        if (!account) {
            throw new Error(`Счёт с ID ${accountId} не найден`);
        }
        return account.getSummary();
    }

    // Дополнительные методы
    getAllAccounts(): Account[] {
        return [...this._accounts];
    }

    getSummaryString(): string {
        return `Общая сводка | Всего счетов: ${this._accounts.length} | Общий баланс: ${this.balance} руб. | Общие доходы: ${this.income} руб. | Общие расходы: ${this.expenses} руб.`;
    }

    toString(): string {
        let result = "=== УПРАВЛЕНИЕ БЮДЖЕТОМ ===\n";
        result += `Всего счетов: ${this._accounts.length}\n`;
        result += `Общий баланс: ${this.balance} руб.\n`;
        result += `Общие доходы: ${this.income} руб.\n`;
        result += `Общие расходы: ${this.expenses} руб.\n\n`;
        
        if (this._accounts.length > 0) {
            result += "Детали по счетам:\n";
            this._accounts.forEach((account, index) => {
                result += `\n${index + 1}. ${account.getSummaryString()}`;
            });
        }
        
        return result;
    }
}