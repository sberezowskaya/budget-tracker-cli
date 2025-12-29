import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export class Transaction {
    public readonly id: string;
    
    constructor(
        public amount: number,
        public type: "income" | "expense",
        public date: string,
        public description: string
    ) {
        this.id = uuidv4();
    }

    toString(): string {
        const sign = this.type === 'income' ? '+' : '-';
        const formattedDate = moment(this.date).format('LL');
        return `[${formattedDate}] ${sign}${this.amount.toFixed(2)} руб. - ${this.description} (ID: ${this.id})`;
    }
}