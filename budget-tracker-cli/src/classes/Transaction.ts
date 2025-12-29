import { ITransaction } from '../interfaces/ITransaction.js';
import { TransactionUpdate } from '../interfaces/utility-types.js';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { TransactionType } from '../interfaces/TransactionType.js';


export class Transaction implements ITransaction {
    public id: string; 
    public amount: number;
    public type: TransactionType;
    public date: string;
    public description: string;
    
    constructor(
        amount: number,
        type: TransactionType,
        date: string,
        description: string
    ) {
        this.id = uuidv4();
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.description = description;
    }

    // Метод для обновления транзакции
    update(update: TransactionUpdate): void {
        if (update.id !== undefined) {
            this.id = update.id;
        }
        if (update.amount !== undefined) {
            this.amount = update.amount;
        }
        if (update.type !== undefined) {
            this.type = update.type;
        }
        if (update.date !== undefined) {
            this.date = update.date;
        }
        if (update.description !== undefined) {
            this.description = update.description;
        }
    }

    toString(): string {
        const sign = this.type === 'income' ? '+' : '-';
        const formattedDate = moment(this.date).format('LL');
        return `[${formattedDate}] ${sign}${this.amount.toFixed(2)} руб. - ${this.description} (ID: ${this.id})`;
    }

    // Метод для получения превью
    getPreview(): { id: string; amount: number; type: TransactionType; date: string } {
        return {
            id: this.id,
            amount: this.amount,
            type: this.type,
            date: this.date
        };
    }
}