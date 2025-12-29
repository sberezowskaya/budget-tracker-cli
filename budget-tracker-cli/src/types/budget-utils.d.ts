declare module '../lib/budget-utils' {
    export function formatCurrency(amount: number, symbol?: string): string;
    export function parseDate(dateString: string): string;
}