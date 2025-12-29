import inquirer from 'inquirer';
import { AccountManager } from './AccountManager.js';
import { Account } from './Account.js';
import { Transaction } from './Transaction.js';

export class ApplicationController {
    public accountManager: AccountManager;

    constructor() {
        this.accountManager = new AccountManager();
    }

    // Запуск приложения
    async start(): Promise<void> {
        console.clear();
        console.log('💰 Бюджетный трекер');
        console.log('===================\n');
        
        await this.mainMenu();
    }

    // Главное меню
    private async mainMenu(): Promise<void> {
        const choices = [];
        
        // Добавить существующие счета в меню
        this.accountManager.getAccounts().forEach((account, index) => {
            choices.push({
                name: `${account.getSummaryString()} (${account.getTransactions().length} транзакций)`,
                value: account.id
            });
        });
        
        choices.push(new inquirer.Separator());
        choices.push({ name: 'Создать новый счёт', value: 'create' });
        choices.push({ name: 'Выход', value: 'exit' });

        const answer = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'Выберите счёт или действие:',
            choices: choices,
            pageSize: 15
        });

        switch (answer.choice) {
            case 'create':
                await this.createAccount();
                break;
            case 'exit':
                console.log('До свидания!');
                process.exit(0);
                break;
            default:
                await this.watchAccount(answer.choice);
                break;
        }
    }

    // Создать счёт
    async createAccount(): Promise<void> {
        console.clear();
        console.log('Создание нового счёта\n');
        
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Введите название счёта:',
                validate: (input: string) => {
                    if (input.trim().length === 0) {
                        return 'Название не может быть пустым';
                    }
                    return true;
                }
            }
        ]);

        const account = new Account(answers.name);
        this.accountManager.addAccount(account);
        
        console.log(`\n✅ Счёт "${account.name}" создан!`);
        await this.pressToContinue();
        await this.mainMenu();
    }

    // Просмотреть счёт
    async watchAccount(accountId: string): Promise<void> {
        const account = this.accountManager.getAccountById(accountId);
        if (!account) {
            console.log('Счёт не найден');
            await this.mainMenu();
            return;
        }

        console.clear();
        console.log('Просмотр счёта\n');
        console.log(account.getSummaryString());
        console.log(`Доходы: ${account.income} руб.`);
        console.log(`Расходы: ${account.expenses} руб.`);
        
        console.log('\nТранзакции:');
        if (account.getTransactions().length === 0) {
            console.log('   Нет транзакций');
        } else {
            account.getTransactions().forEach((transaction, index) => {
                console.log(`   ${index + 1}. ${transaction.toString()}`);
            });
        }

        const choices = [
            { name: 'Добавить транзакцию', value: 'add' },
            { name: 'Удалить транзакцию', value: 'remove' },
            { name: 'Экспорт в CSV', value: 'export' },
            { name: 'Удалить счёт', value: 'delete' },
            { name: 'Назад к списку счетов', value: 'back' }
        ];

        const answer = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: '\nВыберите действие:',
            choices: choices
        });

        switch (answer.choice) {
            case 'add':
                await this.addTransaction(accountId);
                break;
            case 'remove':
                await this.removeTransaction(accountId);
                break;
            case 'export':
                await this.exportTransactionsToCSV(accountId);
                break;
            case 'delete':
                await this.removeAccount(accountId);
                break;
            case 'back':
                await this.mainMenu();
                break;
        }
    }

    // Удалить счёт
    async removeAccount(accountId: string): Promise<void> {
        const account = this.accountManager.getAccountById(accountId);
        if (!account) {
            console.log('Счёт не найден');
            await this.mainMenu();
            return;
        }

        const answer = await inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: `Удалить счёт "${account.name}"? Все транзакции будут удалены.`,
            default: false
        });

        if (answer.confirm) {
            this.accountManager.removeAccountById(accountId);
            console.log(`✅ Счёт "${account.name}" удалён`);
        } else {
            console.log('❌ Удаление отменено');
        }

        await this.pressToContinue();
        await this.mainMenu();
    }

    // Удалить транзакцию
    async removeTransaction(accountId: string): Promise<void> {
        const account = this.accountManager.getAccountById(accountId);
        if (!account) {
            console.log('Счёт не найден');
            await this.mainMenu();
            return;
        }

        const transactions = account.getTransactions();
        if (transactions.length === 0) {
            console.log('Нет транзакций для удаления');
            await this.pressToContinue();
            await this.watchAccount(accountId);
            return;
        }

        const choices = transactions.map((transaction, index) => ({
            name: `${index + 1}. ${transaction.toString()}`,
            value: transaction.id
        }));

        choices.push({ name: 'Отмена', value: 'cancel' });

        const answer = await inquirer.prompt({
            type: 'list',
            name: 'transactionId',
            message: 'Выберите транзакцию для удаления:',
            choices: choices
        });

        if (answer.transactionId === 'cancel') {
            await this.watchAccount(accountId);
            return;
        }

        const confirm = await inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: 'Удалить эту транзакцию?',
            default: false
        });

        if (confirm.confirm) {
            const removed = account.removeTransactionById(answer.transactionId);
            if (removed) {
                console.log('✅ Транзакция удалена');
            } else {
                console.log('❌ Транзакция не найдена');
            }
        } else {
            console.log('❌ Удаление отменено');
        }

        await this.pressToContinue();
        await this.watchAccount(accountId);
    }

    // Добавить транзакцию
    async addTransaction(accountId: string): Promise<void> {
        const account = this.accountManager.getAccountById(accountId);
        if (!account) {
            console.log('Счёт не найден');
            await this.mainMenu();
            return;
        }

        console.clear();
        console.log('Добавление транзакции\n');

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: 'Сумма транзакции:',
                validate: (input: string) => {
                    const amount = parseFloat(input);
                    if (isNaN(amount) || amount <= 0) {
                        return 'Введите положительное число';
                    }
                    return true;
                },
                filter: (input: string) => parseFloat(input)
            },
            {
                type: 'list',
                name: 'type',
                message: 'Тип транзакции:',
                choices: [
                    { name: 'Доход', value: 'income' },
                    { name: 'Расход', value: 'expense' }
                ]
            },
            {
                type: 'input',
                name: 'date',
                message: 'Дата (YYYY-MM-DD):',
                default: new Date().toISOString().split('T')[0],
                validate: (input: string) => {
                    const date = new Date(input);
                    if (isNaN(date.getTime())) {
                        return 'Введите дату в формате YYYY-MM-DD';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Описание:',
                validate: (input: string) => {
                    if (input.trim().length === 0) {
                        return 'Описание не может быть пустым';
                    }
                    return true;
                }
            }
        ]);

        const transaction = new Transaction(
            answers.amount,
            answers.type,
            answers.date,
            answers.description
        );

        account.addTransaction(transaction);
        console.log(`\n✅ Транзакция добавлена: ${transaction.toString()}`);
        
        await this.pressToContinue();
        await this.watchAccount(accountId);
    }

    // Экспорт в CSV
    async exportTransactionsToCSV(accountId: string): Promise<void> {
        const account = this.accountManager.getAccountById(accountId);
        if (!account) {
            console.log('Счёт не найден');
            await this.mainMenu();
            return;
        }

        if (account.getTransactions().length === 0) {
            console.log('Нет транзакций для экспорта');
            await this.pressToContinue();
            await this.watchAccount(accountId);
            return;
        }

        const answer = await inquirer.prompt({
            type: 'input',
            name: 'filename',
            message: 'Имя файла (без расширения):',
            default: `transactions_${account.name.replace(/\s+/g, '_')}`,
            validate: (input: string) => {
                if (input.trim().length === 0) {
                    return 'Введите имя файла';
                }
                return true;
            }
        });

        const filename = `${answer.filename}.csv`;

        try {
            await account.exportTransactionsToCSV(filename);
            console.log(`✅ Транзакции экспортированы в файл: ${filename}`);
        } catch (error) {
            console.log(`❌ Ошибка при экспорте: ${error instanceof Error ? error.message : error}`);
        }

        await this.pressToContinue();
        await this.watchAccount(accountId);
    }

    // Вспомогательный метод для ожидания
    private async pressToContinue(): Promise<void> {
        console.log('\n---');
        await inquirer.prompt({
            type: 'input',
            name: 'continue',
            message: 'Нажмите Enter для продолжения...'
        });
    }
}