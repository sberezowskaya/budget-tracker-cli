export interface ITransaction {
    id: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    description: string;
    toString(): string;
}