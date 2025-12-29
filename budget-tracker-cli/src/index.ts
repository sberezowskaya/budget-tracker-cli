// import { Account, Transaction, AccountManager } from './classes';
// import './calculation-demo';
// import './functions';

// console.log("Budget Tracker CLI - Проверка классов и ООП");
// console.log("===========================================\n");

// // 1. Создать менеджер счетов
// const manager = new AccountManager();

// // 2. Создать счета
// const mainAccount = new Account(1, "Основной счёт");
// const savingsAccount = new Account(2, "Накопительный счёт");

// // 3. Создать транзакции
// const salary = new Transaction(101, 50000, "income", "2024-12-01", "Зарплата");
// const rent = new Transaction(102, 15000, "expense", "2024-12-02", "Аренда квартиры");
// const groceries = new Transaction(103, 5000, "expense", "2024-12-03", "Продукты");
// const bonus = new Transaction(104, 10000, "income", "2024-12-04", "Премия");
// const transfer = new Transaction(105, 8000, "expense", "2024-12-05", "Перевод на накопительный");

// // 4. Добавить транзакции на основной счёт
// console.log("=== Добавление транзакций ===\n");
// mainAccount.addTransaction(salary);
// mainAccount.addTransaction(rent);
// mainAccount.addTransaction(groceries);
// mainAccount.addTransaction(bonus);
// mainAccount.addTransaction(transfer);

// // 5. Создать транзакции для накопительного счёта
// const deposit = new Transaction(201, 8000, "income", "2024-12-05", "Перевод с основного счёта");
// savingsAccount.addTransaction(deposit);

// // 6. Добавить счета в менеджер
// console.log("=== Добавление счетов ===\n");
// manager.addAccount(mainAccount);
// manager.addAccount(savingsAccount);

// // 7. Проверить геттеры и методы
// console.log("=== Проверка геттеров ===\n");
// console.log(`Баланс основного счёта: ${mainAccount.balance} руб.`);
// console.log(`Доходы основного счёта: ${mainAccount.income} руб.`);
// console.log(`Расходы основного счёта: ${mainAccount.expenses} руб.\n`);

// // 8. Проверить сводки
// console.log("=== Сводки по счетам ===\n");
// console.log(mainAccount.getSummaryString());
// console.log(savingsAccount.getSummaryString());
// console.log();

// // 9. Проверить строковые представления
// console.log("=== Строковые представления ===\n");
// console.log("Транзакция:", salary.toString());
// console.log("\nСчёт:");
// console.log(mainAccount.toString());

// // 10. Проверить менеджер
// console.log("=== Работа AccountManager ===\n");
// console.log(manager.getSummaryString());
// console.log("\n" + manager.toString());

// // 11. тест удаление
// console.log("=== Тестирование удаления ===\n");
// const removed = mainAccount.removeTransactionById(102);
// console.log(`Удалена транзакция с ID 102: ${removed ? 'Да' : 'Нет'}`);
// console.log(`Новый баланс основного счёта: ${mainAccount.balance} руб.`);

// // 12. Получить счёт по ID
// console.log("\n=== Поиск счёта по ID ===\n");
// const foundAccount = manager.getAccountById(2);
// if (foundAccount) {
//     console.log(`Найден счёт: ${foundAccount.name}`);
//     console.log(foundAccount.getSummaryString());
// }

// // 13. Получить все транзакции
// console.log("\n=== Все транзакции основного счёта ===\n");
// const allTransactions = mainAccount.getTransactions();
// allTransactions.forEach(transaction => {
//     console.log(`  ${transaction.toString()}`);
// });

// console.log("\nПроверка классов и ООП завершена!");

// // Импортируем и тестируем generics
// import { testGenerics } from './generics';

// console.log("\n" + "=".repeat(60));
// console.log("НАЧАЛО ТЕСТИРОВАНИЯ GENERICS");
// console.log("=".repeat(60));

// testGenerics();

// Главный файл приложения
/// <reference path="./classes/Transaction.ts" />
/// <reference path="./classes/Account.ts" />
/// <reference path="./classes/AccountManager.ts" />

console.log("Budget Tracker CLI - Организация с использованием Namespace");
console.log("===========================================================\n");

// Используем классы через пространство имён BudgetTracker
const personalAccount = new BudgetTracker.Account(1, 'Личный бюджет');

// Добавляем транзакции
personalAccount.addTransaction(new BudgetTracker.Transaction(
    1, 
    1000, 
    'income', 
    '2023-01-01T00:00:00Z', 
    'Зарплата'
));

personalAccount.addTransaction(new BudgetTracker.Transaction(
    2, 
    200, 
    'expense', 
    '2023-01-05T00:00:00Z', 
    'Продукты'
));

personalAccount.addTransaction(new BudgetTracker.Transaction(
    3, 
    150, 
    'expense', 
    '2023-01-10T00:00:00Z', 
    'Коммунальные услуги'
));

// Создаем менеджер счетов
const manager = new BudgetTracker.AccountManager();
manager.addAccount(personalAccount);

// Выводим информацию
console.log(String(personalAccount));
console.log(`Общий баланс всех бюджетов: ${manager.balance} ₽\n`);

console.log('Транзакции личного бюджета:');
personalAccount.getTransactions().forEach(t => console.log(t.toString()));

// Дополнительные тесты
console.log("\n" + "=".repeat(50));
console.log("Дополнительные тесты");
console.log("=".repeat(50));

// Создаем второй счет
const savingsAccount = new BudgetTracker.Account(2, 'Накопительный счет');
savingsAccount.addTransaction(new BudgetTracker.Transaction(
    4,
    500,
    'income',
    '2023-01-15T00:00:00Z',
    'Перевод с основной карты'
));

manager.addAccount(savingsAccount);

console.log("\n" + manager.getSummaryString());
console.log("\nДетальная информация по всем счетам:");
console.log(manager.toString());

// Проверяем получение счета по ID
const foundAccount = manager.getAccountById(1);
if (foundAccount) {
    console.log("\nНайден счет по ID 1:");
    console.log(foundAccount.getSummaryString());
}

console.log("\nПриложение работает с использованием namespace!");