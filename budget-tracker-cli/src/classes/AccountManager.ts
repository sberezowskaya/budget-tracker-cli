import { Account } from './Account';

export class AccountManager {
    private _accounts: Account[] = [];

    get income(): number {
        return this._accounts.reduce((sum, account) => sum + account.income, 0);
    }

    get expenses(): number {
        return this._accounts.reduce((sum, account) => sum + account.expenses, 0);
    }

    get balance(): number {
        return this.income - this.expenses;
    }

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

    getSummary(accountId: string) {
        const account = this.getAccountById(accountId);
        if (!account) {
            throw new Error(`Счёт с ID ${accountId} не найден`);
        }
        return account.getSummary();
    }
}