import { IAccount, ITransaction, IAccountManager, TransactionType, ISummary } from './types';
import './calculation-demo';
import './functions';

console.log("Budget Tracker CLI - Проверка интерфейсов и типов");
console.log("=================================================\n");

// 1. Создать реализацию IAccount
const myAccount: IAccount = {
    id: 1,
    name: "Основной счёт",
    transactions: [] as ITransaction[],
    
    addTransaction(transaction: ITransaction): void {
        this.transactions!.push(transaction);
        console.log(`Транзакция "${transaction.description}" добавлена.`);
    },
    
    removeTransactionById(transactionId: number): boolean {
        const initialLength = this.transactions!.length;
        this.transactions = this.transactions!.filter((t: ITransaction) => t.id !== transactionId);
        const removed = initialLength > this.transactions!.length;
        if (removed) {
            console.log(`Транзакция с ID ${transactionId} удалена.`);
        }
        return removed;
    },
    
    getTransactions(): ITransaction[] {
        return this.transactions!;
    }
};

// 2. Создать транзакции
const transaction1: ITransaction = {
    id: 101,
    amount: 50000,
    type: "income",
    date: "2024-12-01",
    description: "Зарплата"
};

const transaction2: ITransaction = {
    id: 102,
    amount: 15000,
    type: "expense",
    date: "2024-12-02",
    description: "Аренда квартиры"
};

const transaction3: ITransaction = {
    id: 103,
    amount: 5000,
    type: "expense",
    date: "2024-12-03",
    description: "Продукты"
};

// 3. Создать реализацию IAccountManager
const accountManager: IAccountManager = {
    accounts: [] as IAccount[],
    
    addAccount(account: IAccount): void {
        this.accounts!.push(account);
        console.log(`Счёт "${account.name}" добавлен.`);
    },
    
    removeAccountById(accountId: number): boolean {
        const initialLength = this.accounts!.length;
        this.accounts = this.accounts!.filter((a: IAccount) => a.id !== accountId);
        const removed = initialLength > this.accounts!.length;
        if (removed) {
            console.log(`Счёт с ID ${accountId} удалён.`);
        }
        return removed;
    },
    
    getAccounts(): IAccount[] {
        return this.accounts!;
    },
    
    getAccountById(id: number): IAccount | undefined {
        return this.accounts!.find((account: IAccount) => account.id === id);
    },
    
    getSummary(accountId: number): ISummary {
        const account = this.getAccountById(accountId);
        if (!account) {
            throw new Error(`Счёт с ID ${accountId} не найден`);
        }
        
        const transactions = account.getTransactions();
        let income = 0;
        let expenses = 0;
        
        transactions.forEach((transaction: ITransaction) => {
            if (transaction.type === "income") {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });
        
        return {
            income,
            expenses,
            balance: income - expenses
        };
    }
};

// 4. Проверка работы
console.log("=== Тестирование работы интерфейсов ===\n");

// Добавить счёт
accountManager.addAccount(myAccount);

// Добавить транзакции
myAccount.addTransaction(transaction1);
myAccount.addTransaction(transaction2);
myAccount.addTransaction(transaction3);

// Получить сводку
const summary = accountManager.getSummary(1);
console.log("\n=== Сводка по счёту ===");
console.log(`Доходы: ${summary.income} руб.`);
console.log(`Расходы: ${summary.expenses} руб.`);
console.log(`Баланс: ${summary.balance} руб.\n`);

// Показать все транзакции
console.log("=== Все транзакции ===");
myAccount.getTransactions().forEach((transaction: ITransaction) => {
    console.log(`${transaction.id}: ${transaction.description} - ${transaction.amount} руб. (${transaction.type})`);
});

// Удалить транзакцию
console.log("\n=== Удаление транзакции ===");
myAccount.removeTransactionById(102);

// Новая сводка после удаления
const newSummary = accountManager.getSummary(1);
console.log("\n=== Новая сводка после удаления ===");
console.log(`Доходы: ${newSummary.income} руб.`);
console.log(`Расходы: ${newSummary.expenses} руб.`);
console.log(`Баланс: ${newSummary.balance} руб.`);

console.log("\nПроверка интерфейсов завершена!");