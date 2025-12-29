declare module './budget-utils.js' {
    export function formatCurrency(amount: number, symbol?: string): string;
    export function parseDate(dateString: string): string;
}
