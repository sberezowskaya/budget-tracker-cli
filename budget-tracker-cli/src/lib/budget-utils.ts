export function formatCurrency(amount: number, symbol: string = "₽"): string {
    return amount.toFixed(2) + " " + symbol;
}

export function parseDate(dateString: string): string {
    return new Date(dateString).toISOString();
}
