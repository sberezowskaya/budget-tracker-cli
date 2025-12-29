import { IAccountManager } from '../interfaces/IAccountManager.js';
import { ISummary } from '../interfaces/ISummary.js';
import { Account } from './Account.js';

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
        return [...this._accounts];
    }

    // Методы интерфейса IAccountManager
    addAccount(account: Account): void {
        this._accounts.push(account);
    }

    removeAccountById(accountId: string): boolean {
        const initialLength = this._accounts.length;
        this._accounts = this._accounts.filter(a => a.id !== accountId);
        return initialLength > this._accounts.length;
    }

    getAccounts(): Account[] {
        return [...this._accounts];
    }

    getAccountById(id: string): Account | undefined {
        return this._accounts.find(account => account.id === id);
    }

    getSummary(accountId: string): ISummary {
        const account = this.getAccountById(accountId);
        if (!account) {
            throw new Error(`Счёт с ID ${accountId} не найден`);
        }
        return account.getSummary();
    }
}