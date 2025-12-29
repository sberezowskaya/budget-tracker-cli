import { Account } from './classes/Account.js';
import { Transaction } from './classes/Transaction.js';
import { AccountManager } from './classes/AccountManager.js';
import './decorators/reflect-metadata.js';

async function main() {
    console.log("ДЗ №12: Декораторы и метапрограммирование");

    // ==================== 1. Тестирование декоратора класса ====================
    console.log("1. Тестирование @LogClass (создание экземпляров):");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log("   Создаю счет...");
    const personalAccount = new Account('Личный бюджет');
    
    console.log("   Создаю транзакцию...");
    const transaction = new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата');
    
    // ==================== 2. Тестирование декоратора метода ====================
    console.log("\n2. Тестирование @LogMethod (вызов методов):");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log("   Добавляю транзакцию...");
    personalAccount.addTransaction(transaction);
    
    console.log("\n   Добавляю еще транзакции...");
    personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
    personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09T00:00:00Z', 'Коммунальные услуги'));
    
    console.log("\n   Получаю список транзакций...");
    const transactions = personalAccount.getTransactions();
    console.log(`   Получено транзакций: ${transactions.length}`);
    
    // ==================== 3. Тестирование декоратора ReadOnly ====================
    console.log("\n3. Тестирование @ReadOnly (защита свойств):");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log(`   ID счета: ${personalAccount.id}`);
    console.log(`   Имя счета: ${personalAccount.name}`);
    
    console.log("\n   Пытаюсь изменить ID счета...");
    try {
        // @ts-ignore - специально тестируем ошибку
        personalAccount.id = 'новый-id';
    } catch (error) {
        console.log(`   Ошибка: ${error instanceof Error ? error.message : error}`);
    }
    
    console.log("\n   Пытаюсь изменить имя счета...");
    try {
        // @ts-ignore - специально тестируем ошибку
        personalAccount.name = 'Новое имя';
    } catch (error) {
        console.log(`   Ошибка: ${error instanceof Error ? error.message : error}`);
    }
    
    // ==================== 4. Тестирование метаданных ====================
    console.log("\n4. Тестирование метаданных:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log("   Получаю сводную информацию...");
    const summaryString = personalAccount.getSummaryString();
    console.log(`   ${summaryString}`);
    
    // ==================== 5. Тестирование обновления транзакции ====================
    console.log("\n5. Тестирование обновления транзакции:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log("   Обновляю сумму транзакции...");
    transaction.update({ amount: 1200 });
    console.log(`   Новая сумма: ${transaction.amount}`);
    
    console.log("\n   Пытаюсь изменить ID транзакции...");
    try {
        // @ts-ignore - специально тестируем ошибку
        transaction.id = 'новый-id-транзакции';
    } catch (error) {
        console.log(`   Ошибка: ${error instanceof Error ? error.message : error}`);
    }
    
    // ==================== 6. Работа с менеджером счетов ====================
    console.log("\n6. Работа с AccountManager:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    const manager = new AccountManager();
    manager.addAccount(personalAccount);
    
    console.log(`   Всего счетов: ${manager.getAccounts().length}`);
    console.log(`   Общий баланс: ${manager.balance}`);
    
    // ==================== 7. Вывод информации ====================
    console.log("\n7. Вывод информации:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    console.log("   Строковое представление счета:");
    console.log(`   ${personalAccount.getSummaryString()}`);
    
    console.log("\n   Транзакции основного счета:");
    personalAccount.getTransactions().forEach((t, i) => {
        console.log(`   ${i + 1}. ${t.toString()}`);
    });
    
    // ==================== 8. Экспорт в CSV ====================
    console.log("\n8. Тестирование экспорта в CSV:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    try {
        await personalAccount.exportTransactionsToCSV('transactions-decorators.csv');
        console.log("   Экспорт завершен успешно");
    } catch (error) {
        console.log(`   Ошибка при экспорте: ${error instanceof Error ? error.message : error}`);
    }
    
    // ==================== 9. Статистика ====================
    console.log("\n9. Получение статистики:");
    console.log("   ".repeat(5) + "-".repeat(40));
    
    const stats = await personalAccount.getTransactionStats();
    console.log(`   • Всего транзакций: ${stats.count}`);
    console.log(`   • Доходы: ${stats.income}`);
    console.log(`   • Расходы: ${stats.expenses}`);
    console.log(`   • Баланс: ${stats.total}`);
    console.log(`   • Средняя сумма: ${stats.average.toFixed(2)}`);
}

main().catch(console.error);