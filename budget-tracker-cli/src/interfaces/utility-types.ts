import { ITransaction } from './ITransaction.js';
import { IAccount } from './IAccount.js';
import { Transaction } from '../classes/Transaction.js';
import { TransactionType } from './TransactionType.js';

// ==================== 1. Частичное обновление ====================
export type TransactionUpdate = Partial<ITransaction>;
export type AccountUpdate = Partial<Omit<IAccount, 'id'>>; // ID нельзя менять

// ==================== 2. Обязательные поля и исключения ====================
export type CompleteTransaction = Required<ITransaction>;
export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

// ==================== 3. Выборка ключевых полей ====================
export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;
export type AccountInfo = Pick<IAccount, 'id' | 'name'>;

// ==================== 4. Словарь лимитов по категориям ====================
export type CategoryLimits = Record<TransactionType, number>;

// ==================== 5. Работа с типами функций ====================
export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;
export type TransactionInstance = InstanceType<typeof Transaction>;

// ==================== 6. Работа с необязательными и nullable полями ====================
export type NullableDescription = {
    description: string | null;
};

// ==================== 7. Дополнительные полезные типы ====================
export type ReadonlyTransaction = Readonly<ITransaction>;
export type TransactionKeys = keyof ITransaction;
export type AccountKeys = keyof IAccount;

// Тип для фильтрации транзакций
export type TransactionFilter = Partial<Pick<ITransaction, 'type' | 'date'>>;

// Тип для статистики
export type TransactionStats = {
    total: number;
    average: number;
    count: number;
    byType: Record<TransactionType, number>;
};

// Экспортировать все утилитные типы
export type {
    ITransaction,
    IAccount,
    TransactionType
};
