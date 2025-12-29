/// <reference path="../interfaces/IAccount.ts" />
/// <reference path="../interfaces/ISummary.ts" />
/// <reference path="Transaction.ts" />

namespace BudgetTracker {
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
            return [...this._transactions];
        }

        // Методы интерфейса IAccount
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

        // Дополнительные методы
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
}