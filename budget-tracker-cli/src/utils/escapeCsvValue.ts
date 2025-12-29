export function escapeCsvValue(value: string | number): string {
    const stringValue = String(value);
    
    if (
        stringValue.includes(',') ||
        stringValue.includes('"') ||
        stringValue.includes("'") ||
        stringValue.includes('\n') ||
        stringValue.includes('\r') ||
        stringValue.trim() !== stringValue
    ) {
        const escapedValue = stringValue.replace(/"/g, '""');
        return `"${escapedValue}"`;
    }
    
    return stringValue;
}

/**
 * Тестирование функции экранирования
 */
export function testEscapeCsvValue(): void {
    const testCases = [
        { input: 'Простая строка', expected: 'Простая строка' },
        { input: 'Строка, с запятой', expected: '"Строка, с запятой"' },
        { input: 'Строка "с кавычками"', expected: '"Строка ""с кавычками"""' },
        { input: "Строка 'с апострофом'", expected: '"Строка \'с апострофом\'"' },
        { input: 'Строка\nс переносом', expected: '"Строка\nс переносом"' },
        { input: 1234.56, expected: '1234.56' },
        { input: ' Начало с пробела', expected: '" Начало с пробела"' },
        { input: 'Конец с пробелом ', expected: '"Конец с пробелом "' },
    ];
    
    console.log('Тестирование escapeCsvValue:');
    testCases.forEach((testCase, index) => {
        const result = escapeCsvValue(testCase.input);
        const passed = result === testCase.expected;
        console.log(`  ${passed ? '✅' : '❌'} Тест ${index + 1}: "${testCase.input}" -> "${result}" ${passed ? '' : `(ожидалось: "${testCase.expected}")`}`);
    });
}