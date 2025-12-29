import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// 1. Declaration file для JavaScript библиотеки
declare module './lib/budget-utils.js' {
    export function formatCurrency(amount: number, symbol?: string): string;
    export function parseDate(dateString: string): string;
}

// 2. Импорт JavaScript библиотеки (нетипизированной, но с declaration)
import { formatCurrency } from './lib/budget-utils.js';

// ==================== ЧАСТЬ 1: UUID ====================
console.log("\nЧАСТЬ 1: UUID (генерировать уникальные ID)");
console.log("   ".repeat(10) + "-".repeat(40));

const transactionId = uuidv4();
const accountId = uuidv4();

console.log(`   • transactionId: ${transactionId}`);
console.log(`   • accountId: ${accountId}`);
console.log(`   • Тип: ${typeof transactionId}`);
console.log(`   • Длина UUID: ${transactionId.length} символов`);

// ==================== ЧАСТЬ 2: Moment ====================
console.log("\nЧАСТЬ 2: Moment (работа с датами)");
console.log("   ".repeat(10) + "-".repeat(40));

const now = moment();
const transactionDate = moment('2024-12-28');

console.log(`   • Текущая дата: ${now.format('LL')}`);
console.log(`   • Текущее время: ${now.format('LT')}`);
console.log(`   • Дата транзакции: ${transactionDate.format('dddd, MMMM Do YYYY')}`);
console.log(`   • Разница: ${transactionDate.fromNow()}`);

// ==================== ЧАСТЬ 3: Наша библиотека ====================
console.log("\nЧАСТЬ 3: Наша библиотека budget-utils.js с declaration file");
console.log("   ".repeat(10) + "-".repeat(40));

const amounts = [1234.56, 7890.12, 456.78];
amounts.forEach(amount => {
    console.log(`   • ${amount} → ${formatCurrency(amount)}`);
});

console.log(`   • 1000 USD → ${formatCurrency(1000, '$')}`);
console.log(`   • 500 EUR → ${formatCurrency(500, '€')}`);

// ==================== ЧАСТЬ 4: Интеграция ====================
console.log("\nЧАСТЬ 4: Интеграция всего вместе (имитация транзакции)");
console.log("   ".repeat(10) + "-".repeat(40));

// Создаём "транзакцию" используя все библиотеки
const transaction = {
    id: uuidv4(),
    amount: 50000.75,
    type: "income" as const,
    date: moment().format('YYYY-MM-DD'),
    description: "Зарплата за декабрь",
    category: "Доходы"
};

console.log("ИНФОРМАЦИЯ О ТРАНЗАКЦИИ:");
console.log(`     ID: ${transaction.id}`);
console.log(`     Дата: ${moment(transaction.date).format('LL')}`);
console.log(`     Сумма: ${formatCurrency(transaction.amount)}`);
console.log(`     Описание: ${transaction.description}`);
console.log(`     Тип: ${transaction.type}`);

// ==================== ЧАСТЬ 5: Проверка типов ====================
console.log("\nЧАСТЬ 5: Проверка TypeScript типов");
console.log("   ".repeat(10) + "-".repeat(40));

console.log("  UUID: строка (string)");
console.log("  formatCurrency: (number, string?) => string");