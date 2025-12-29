import { ITransaction } from './ITransaction.js';

// ==================== 1. Условный тип для получения типа поля ====================

export type TransactionFieldType<TField> = 
    TField extends keyof ITransaction ? ITransaction[TField] : never;

// ==================== 2. Mapped type для опциональных полей ====================

export type OptionalTransaction<TFields extends keyof ITransaction> = 
    Omit<ITransaction, TFields> & 
    Partial<Pick<ITransaction, TFields>>;

// ==================== 3. Mapped type для полей только для чтения ====================

export type ReadonlyTransactionFields<TFields extends keyof ITransaction> = 
    Omit<ITransaction, TFields> & 
    Readonly<Pick<ITransaction, TFields>>;

// ==================== 4. Условный тип для проверки типа транзакции ====================

export type IsIncome<T> = 
    T extends { type: 'income' } ? true : false;

// ==================== 5. Дополнительные полезные типы ====================

export type TransactionByType<TType extends ITransaction['type']> = 
    ITransaction & { type: TType };


export type PartialExcept<TRequired extends keyof ITransaction> = 
    Partial<ITransaction> & Pick<ITransaction, TRequired>;

export type ValidatedTransactionUpdate<TFields extends keyof ITransaction> = 
    Partial<Pick<ITransaction, TFields>>;

/**
 * Преобразовать тип транзакции в словарь для быстрого доступа по ID
 */
export type TransactionDictionary = Record<string, ITransaction>;

/**
 * Тип для фильтрации транзакций с поддержкой частичного совпадения
 */
export type TransactionFilterPartial = {
    [K in keyof ITransaction]?: ITransaction[K] extends string | number 
        ? ITransaction[K] | { $contains: string } 
        : ITransaction[K];
};