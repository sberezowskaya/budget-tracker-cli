import { Account } from './classes/Account.js';
import { Transaction } from './classes/Transaction.js';
import { AccountManager } from './classes/AccountManager.js';

// Импортировать утилитные типы
import {
    TransactionUpdate,
    AccountUpdate,
    CompleteTransaction,
    TransactionWithoutDescription,
    TransactionPreview,
    AccountInfo,
    CategoryLimits,
    TransactionConstructorParams,
    TransactionInstance,
    NullableDescription,
    TransactionFilter
} from './interfaces/utility-types.js';

console.log("=".repeat(70));
console.log("ДОМАШНЯЯ РАБОТА №9: Утилитные типы TypeScript");
console.log("=".repeat(70));

// ==================== 1. Частичное обновление ====================
console.log("\n1. Частичное обновление (Partial<T>)");
console.log("   ".repeat(10) + "-".repeat(40));

const transaction = new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата');
console.log("   Исходная транзакция:");
console.log(`   ${transaction.toString()}`);

// Используем Partial<ITransaction>
const transactionUpdate: TransactionUpdate = {
    amount: 1200,
    description: 'Зарплата с премией'
};

transaction.update(transactionUpdate);
console.log("\n   После обновления через TransactionUpdate:");
console.log(`   ${transaction.toString()}`);

// Обновление счёта
const personalAccount = new Account('Личный бюджет');
console.log(`\n   Исходный счёт: ${personalAccount.name}`);

const accountUpdate: AccountUpdate = {
    name: 'Основной счёт'
};

personalAccount.update(accountUpdate);
console.log(`   После обновления через AccountUpdate: ${personalAccount.name}`);

// ==================== 2. Обязательные поля и исключения ====================
console.log("\n2. Обязательные поля и исключения (Required<T>, Omit<T>)");
console.log("   ".repeat(10) + "-".repeat(40));

// Required - все поля обязательны
const completeTransaction: CompleteTransaction = {
    id: '123',
    amount: 500,
    type: 'expense',
    date: '2023-01-05',
    description: 'Продукты',
    toString: () => 'Транзакция'
};
console.log(`   CompleteTransaction: ${completeTransaction.description}`);

const transactionWithoutDesc: TransactionWithoutDescription = {
    id: '456',
    amount: 300,
    type: 'expense',
    date: '2023-01-06'
};
console.log(`   TransactionWithoutDescription: ${transactionWithoutDesc.amount}`);

// ==================== 3. Выборка ключевых полей ====================
console.log("\n3. Выборка ключевых полей (Pick<T>)");
console.log("   ".repeat(10) + "-".repeat(40));

const transactionPreview: TransactionPreview = transaction.getPreview();
console.log(`   TransactionPreview:`, transactionPreview);

const accountInfo: AccountInfo = personalAccount.getInfo();
console.log(`   AccountInfo:`, accountInfo);

// ==================== 4. Словарь лимитов (Record<K, T>) ====================
console.log("\n4. Словарь лимитов по категориям (Record<K, T>)");
console.log("   ".repeat(10) + "-".repeat(40));

const limits: CategoryLimits = {
    income: 10000,
    expense: 5000
};
console.log(`   Лимит доходов: ${limits.income}`);
console.log(`   Лимит расходов: ${limits.expense}`);

// Проверка лимита
const checkLimit = (amount: number, type: 'income' | 'expense'): boolean => {
    return amount <= limits[type];
};

console.log(`   Проверка лимита (1500 доход): ${checkLimit(1500, 'income')}`);
console.log(`   Проверка лимита (6000 расход): ${checkLimit(6000, 'expense')}`);

// ==================== 5. Работа с типами функций ====================
console.log("\n5. Работа с типами функций (ConstructorParameters, InstanceType)");
console.log("   ".repeat(10) + "-".repeat(40));

// Параметры конструктора Transaction
const transactionParams: TransactionConstructorParams = [
    500,
    'expense',
    '2023-02-01T00:00:00Z',
    'Покупка'
];

// Создать транзакцию из параметров
const newTransaction: TransactionInstance = new Transaction(...transactionParams);
console.log(`   Новая транзакция из параметров: ${newTransaction.toString()}`);

// ==================== 6. Необязательные и nullable поля ====================
console.log("\n6. Необязательные и nullable поля");
console.log("   ".repeat(10) + "-".repeat(40));

const nullableDesc: NullableDescription = {
    description: null
};
console.log(`   NullableDescription: ${nullableDesc.description}`);

// ==================== 7. Дополнительные примеры ====================
console.log("\n7. Дополнительные примеры");
console.log("   ".repeat(10) + "-".repeat(40));

// Filter транзакций
const filter: TransactionFilter = {
    type: 'expense'
};

console.log(`   TransactionFilter:`, filter);

// Работа с менеджером счетов
const manager = new AccountManager();
personalAccount.addTransaction(transaction);
personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09T00:00:00Z', 'Коммунальные услуги'));

manager.addAccount(personalAccount);

console.log("\n   Информация о счёте через AccountManager:");
console.log(`   Баланс: ${manager.balance}`);
console.log(`   Всего счетов: ${manager.getAccounts().length}`);

console.log("\n   Транзакции основного счёта:");
personalAccount.getTransactions().forEach((t, i) => {
    console.log(`   ${i + 1}. ${t.toString()}`);
});
