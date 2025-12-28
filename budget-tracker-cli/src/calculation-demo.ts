const income: number = 50000;        // общий доход за месяц
const expenses: number = 35000;      // общий расход за месяц
const savings: number = 10000;       // сумма, которую хотим отложить

const netIncome: number = income - expenses;        // чистый доход
const remaining: number = netIncome - savings;      // оставшаяся сумма

// Вывод всех переменных в консоль
console.log("Budget Calculations:");
console.log("=======================");
console.log(`Общий доход: ${income} руб.`);
console.log(`Общая сумма расходов: ${expenses} руб.`);
console.log(`Планируемая экономия: ${savings} руб.`);
console.log(`Чистый доход: ${netIncome} руб.`);
console.log(`Оставшиеся после накопления: ${remaining} руб.`);
console.log("=======================");

