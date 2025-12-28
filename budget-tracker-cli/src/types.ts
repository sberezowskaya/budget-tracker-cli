// 1. Тип TransactionType
export type TransactionType = "income" | "expense";

// 2. Интерфейс ITransaction
export interface ITransaction {
    id: number;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
    toString(): string; // метод для строкового представления
}

// 3. Интерфейс IAccount
export interface IAccount {
    id: number;
    name: string;
    transactions?: ITransaction[];
    
    addTransaction(transaction: ITransaction): void;
    removeTransactionById(transactionId: number): boolean;
    getTransactions(): ITransaction[];
    getSummary(): ISummary; //  метод для сводки
}

// 4. Интерфейс ISummary
export interface ISummary {
    income: number;
    expenses: number;
    balance: number;
}

// 5. Интерфейс IAccountManager
export interface IAccountManager {
    accounts?: IAccount[];
    
    addAccount(account: IAccount): void;
    removeAccountById(accountId: number): boolean;
    getAccounts(): IAccount[];
    getAccountById(id: number): IAccount | undefined;
    getSummary(accountId: number): ISummary;
}