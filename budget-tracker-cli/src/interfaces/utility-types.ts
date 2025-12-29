import { ITransaction, IAccount, TransactionType } from './index.js';
import { Transaction } from '../classes/Transaction.js';

// Реэкспортировать типы из mapped-types.ts
export type {
    TransactionFieldType,
    OptionalTransaction,
    ReadonlyTransactionFields,
    IsIncome,
    TransactionByType,
    PartialExcept,
    ValidatedTransactionUpdate,
    TransactionDictionary,
    TransactionFilterPartial
} from './mapped-types.js';

// ==================== Существующие утилитные типы ====================

export type TransactionUpdate = Partial<ITransaction>;
export type AccountUpdate = Partial<Omit<IAccount, 'id'>>;

export type CompleteTransaction = Required<ITransaction>;
export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;
export type AccountInfo = Pick<IAccount, 'id' | 'name'>;

export type CategoryLimits = Record<TransactionType, number>;

export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;
export type TransactionInstance = InstanceType<typeof Transaction>;

export type NullableDescription = {
    description: string | null;
};