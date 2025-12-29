/// <reference path="../interfaces/ITransaction.ts" />
/// <reference path="../interfaces/TransactionType.ts" />

namespace BudgetTracker {
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
}