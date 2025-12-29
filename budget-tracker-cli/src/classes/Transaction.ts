import { ITransaction, TransactionType } from '../interfaces/index.js';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

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

    toString(): string {
        const sign = this.type === 'income' ? '+' : '-';
        const formattedDate = moment(this.date).format('DD.MM.YYYY');
        return `${formattedDate} ${sign}${this.amount} руб. - ${this.description}`;
    }

    getShortId(): string {
        return this.id.substring(0, 8); // Короткий ID для отображения
    }
}