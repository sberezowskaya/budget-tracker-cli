// src/index.ts
import { Account } from './classes/Account.js';
import { Transaction } from './classes/Transaction.js';
import { AccountManager } from './classes/AccountManager.js';
import { testEscapeCsvValue } from './utils/escapeCsvValue.js';
import { promises as fs } from 'fs';
import path from 'path';

// Функция для очистки тестовых файлов
async function cleanupTestFiles(): Promise<void> {
    const files = ['transactions.csv', 'test-export.csv'];
    for (const file of files) {
        try {
            await fs.unlink(file);
            console.log(` Очищен файл: ${file}`);
        } catch {
        }
    }
}

// Основная асинхронная функция
async function main() {
    try {
        // ==================== 1. Тестирование экранирования CSV ====================
        console.log("\n1. Тестирование функции экранирования CSV");
        console.log("   ".repeat(10) + "-".repeat(40));
        testEscapeCsvValue();

        // ==================== 2. Создание тестовых данных ====================
        console.log("\n2. Создание тестовых данных");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        const account = new Account('Тестовый счёт');
        
        // транзакции с разными типами данных
        account.addTransaction(new Transaction(
            50000,
            'income',
            '2024-01-01',
            'Зарплата за январь'
        ));
        
        account.addTransaction(new Transaction(
            15000,
            'expense',
            '2024-01-02',
            'Аренда квартиры'
        ));
        
        account.addTransaction(new Transaction(
            5000,
            'expense',
            '2024-01-03',
            'Продукты: молоко, хлеб, яйца'
        ));
        
        account.addTransaction(new Transaction(
            3000,
            'expense',
            '2024-01-04',
            'Кафе "У Петровича"'
        ));
        
        account.addTransaction(new Transaction(
            10000,
            'income',
            '2024-01-05',
            'Фриланс\n(веб-разработка)'
        ));
        
        console.log(`   Создан счёт: ${account.name}`);
        console.log(`   Количество транзакций: ${account.getTransactions().length}`);
        console.log(`   Баланс: ${account.balance}`);

        // ==================== 3. Асинхронная статистика ====================
        console.log("\n3. Асинхронное получение статистики");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        console.log("   Загружаем статистику...");
        const stats = await account.getTransactionStats();
        console.log(`   • Всего транзакций: ${stats.count}`);
        console.log(`   • Общий доход: ${stats.income}`);
        console.log(`   • Общий расход: ${stats.expenses}`);
        console.log(`   • Средняя сумма: ${stats.average.toFixed(2)}`);
        console.log(`   • Баланс: ${stats.total}`);

        // ==================== 4. Экспорт в CSV ====================
        console.log("\n4. Экспорт транзакций в CSV файл");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        const filename = 'transactions.csv';
        
        try {
            console.log(` Экспортируем в файл: ${filename}`);
            await account.exportTransactionsToCSV(filename);
            
            const fileInfo = await fs.stat(filename);
            console.log(`    Файл создан: ${filename}`);
            console.log(`   Размер файла: ${fileInfo.size} байт`);
            
            const fileContent = await fs.readFile(filename, 'utf-8');
            const lines = fileContent.split('\n').slice(0, 6); // Первые 6 строк
            console.log("\n   Содержимое файла (первые строки):");
            lines.forEach((line, index) => {
                console.log(`   ${index + 1}. ${line}`);
            });
            
        } catch (error) {
            console.error(`Ошибка при экспорте:`, error instanceof Error ? error.message : error);
        }

        // ==================== 5. Обработка ошибок ====================
        console.log("\n5. Тестирование обработки ошибок");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        try {
            console.log("   Тестируем запись в невалидный путь...");
            await account.exportTransactionsToCSV('/несуществующая/папка/file.csv');
        } catch (error) {
            console.log(`  Ошибка корректно обработана: ${error instanceof Error ? error.message : 'Ошибка записи'}`);
        }

        // ==================== 6. Параллельные операции ====================
        console.log("\n6. Параллельные асинхронные операции");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        console.log("   ⚡ Запускаем параллельные задачи...");
        
        const [stats1, stats2] = await Promise.all([
            account.getTransactionStats(),
            new Promise((resolve) => {
                setTimeout(() => resolve('Вторая задача выполнена'), 50);
            })
        ]);
        
        console.log(`    Статистика: ${JSON.stringify(stats1)}`);
        console.log(`    ${stats2}`);

        // ==================== 7. Работа с менеджером ====================
        console.log("\n 7. Асинхронные операции с менеджером счетов");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        const manager = new AccountManager();
        manager.addAccount(account);
        
        const account2 = new Account('Второй счёт');
        account2.addTransaction(new Transaction(2000, 'income', '2024-01-06', 'Кэшбэк'));
        manager.addAccount(account2);
        
        console.log(`   Менеджер счетов:`);
        console.log(`   • Всего счетов: ${manager.getAccounts().length}`);
        console.log(`   • Общий баланс: ${manager.balance}`);
        
        // Экспорт со второго счёта
        await account2.exportTransactionsToCSV('test-export.csv');
        console.log(`   Экспорт второго счёта завершен`);

        // ==================== 8. Очистка тестовых файлов ====================
        console.log("\n 8. Очистка тестовых файлов");
        console.log("   ".repeat(10) + "-".repeat(40));
        
        await cleanupTestFiles();


    } catch (error) {
        console.error("\nКритическая ошибка в приложении:", error);
        process.exit(1);
    }
}

// Запуск основной функции
main().catch(console.error);