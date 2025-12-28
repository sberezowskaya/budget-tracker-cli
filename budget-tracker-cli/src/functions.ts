// 1. calculateTotal
export function calculateTotal(values: number[]): number {
    return values.reduce((sum, current) => sum + current, 0);
}

// 2. calculateAverage
export function calculateAverage(values: number[]): number {
    if (values.length === 0) {
        return 0;
    }
    return calculateTotal(values) / values.length;
}

// 3. formatCurrency
export function formatCurrency(amount: number, symbol: string): string {
    return `${amount} ${symbol}`;
}

// 4. getTopValues
export function getTopValues(values: number[], count: number): number[] {
    // Сортировка по убыванию и берём первые count элементов
    return [...values]
        .sort((a, b) => b - a)
        .slice(0, count);
}

// 5. printSummary
export function printSummary(values: number[]): void {
    const total = calculateTotal(values);
    const average = calculateAverage(values);
    
    console.log(`Всего записей: ${values.length}`);
    console.log(`Сумма: ${total}`);
    console.log(`Среднее: ${average}`);
}

// ========== ПРОВЕРКА ФУНКЦИЙ ==========
console.log('\n=== Проверка функций из задания №3 ===\n');

// 1. Проверка calculateTotal
const testTotal = calculateTotal([1000, 2000, 3000]);
console.log('1. calculateTotal([1000, 2000, 3000]):', testTotal);

// 2. Проверка calculateAverage
const testAverage = calculateAverage([1000, 2000, 3000]);
console.log('2. calculateAverage([1000, 2000, 3000]):', testAverage);
console.log('   calculateAverage([]) (пустой массив):', calculateAverage([]));

// 3. Проверка formatCurrency
const testCurrency = formatCurrency(1000, '₽');
console.log('3. formatCurrency(1000, "₽"):', testCurrency);

// 4. Проверка getTopValues
const testTopValues = getTopValues([100, 500, 200, 800], 2);
console.log('4. getTopValues([100, 500, 200, 800], 2):', testTopValues);

// 5. Проверка printSummary
console.log('5. printSummary([100, 500, 1000, 2000, 800]):');
printSummary([100, 500, 1000, 2000, 800]);