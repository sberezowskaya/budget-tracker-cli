/// <reference path="../interfaces/IAccountManager.ts" />
/// <reference path="../interfaces/ISummary.ts" />
/// <reference path="Account.ts" />

namespace BudgetTracker {
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
}