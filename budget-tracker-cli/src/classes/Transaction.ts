import { ITransaction, TransactionType } from '../interfaces/index.js';
import { TransactionUpdate } from '../interfaces/utility-types.js';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// Импортировать декораторы
import { LogClass } from '../decorators/LogClass.js';
import { LogMethod } from '../decorators/LogMethod.js';
import { ReadOnly } from '../decorators/ReadOnly.js';
import '../decorators/reflect-metadata.js';

@LogClass
export class Transaction implements ITransaction {
    @ReadOnly
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

    @LogMethod
    update(update: TransactionUpdate): void {
        if (update.id !== undefined) {
            console.log(`Попытка изменить id транзакции (игнорируется)`);
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

    getPreview(): { id: string; amount: number; type: TransactionType; date: string } {
        return {
            id: this.id,
            amount: this.amount,
            type: this.type,
            date: this.date
        };
    }
}