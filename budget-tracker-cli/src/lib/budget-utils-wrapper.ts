// src/lib/budget-utils-wrapper.ts
import type { formatCurrency as formatCurrencyType } from './budget-utils.js';

// Динамический импорт
let formatCurrencyInstance: typeof formatCurrencyType;

export async function getFormatCurrency() {
    if (!formatCurrencyInstance) {
        const utils = await import('./budget-utils.js');
        formatCurrencyInstance = utils.formatCurrency;
    }
    return formatCurrencyInstance;
}

// Или просто создай свою функцию
export function formatCurrency(amount: number, symbol: string = "₽"): string {
    return amount.toFixed(2) + " " + symbol;
}