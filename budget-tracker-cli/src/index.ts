import { ApplicationController } from './classes/ApplicationController.js';
import { Account } from './classes/Account.js';
import { Transaction } from './classes/Transaction.js';

// Функция для начального заполнения данными
function setInitialState(controller: ApplicationController): void {
    const personalAccount = new Account('Личный бюджет');
    personalAccount.addTransaction(new Transaction(1000, 'income', '2023-01-01', 'Зарплата'));
    personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05', 'Продукты'));
    personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09', 'Коммунальные услуги'));
    controller.accountManager.addAccount(personalAccount);

    const vacationAccount = new Account('Копилка на отпуск');
    vacationAccount.addTransaction(new Transaction(500, 'income', '2023-04-01', 'Премия'));
    vacationAccount.addTransaction(new Transaction(600, 'income', '2023-01-01', 'Возврат долга'));
    vacationAccount.addTransaction(new Transaction(300, 'expense', '2023-01-05', 'Билеты на самолёт'));
    vacationAccount.addTransaction(new Transaction(200, 'expense', '2023-01-09', 'Номер в отеле'));
    controller.accountManager.addAccount(vacationAccount);
}

// Запуск приложения
async function main(): Promise<void> {
    console.clear();
    console.log('Бюджетный трекер - запуск...\n');
    
    const controller = new ApplicationController();
    
    // Добавить начальные данные
    setInitialState(controller);
    
    console.log('Система инициализирована');
    console.log(`Загружено счетов: ${controller.accountManager.getAccounts().length}`);
    console.log('\n---\n');
    
    await controller.start();
}

// Обработка ошибок и запуск
main().catch(error => {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
});