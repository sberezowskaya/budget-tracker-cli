import {
    TransactionFieldType,
    OptionalTransaction,
    ReadonlyTransactionFields,
    IsIncome,
    TransactionByType,
    PartialExcept,
    ValidatedTransactionUpdate
} from './interfaces/mapped-types.js';

import { ITransaction } from './interfaces/ITransaction.js';

console.log("Тестирование Conditional Types и Mapped Types");
console.log("==============================================\n");

// ==================== 1. Тестирование TransactionFieldType ====================

console.log("1. TransactionFieldType<TField>:");

// Получить тип поля amount
type AmountType = TransactionFieldType<'amount'>;
const amountExample: AmountType = 1000;
console.log(`   TransactionFieldType<'amount'>: ${typeof amountExample} (значение: ${amountExample})`);

// Получить тип поля description
type DescriptionType = TransactionFieldType<'description'>;
const descriptionExample: DescriptionType = "Тестовая транзакция";
console.log(`   TransactionFieldType<'description'>: ${typeof descriptionExample}`);

// Несуществующее поле возвращает never
type UnknownType = TransactionFieldType<'unknown'>;
// const unknownExample: UnknownType = ...; // never - нельзя присвоить значение

console.log(" TransactionFieldType корректно возвращает типы полей");

// ==================== 2. Тестирование OptionalTransaction ====================

console.log("\n2. OptionalTransaction<TFields>:");

type TransactionWithOptionalDescAndDate = OptionalTransaction<'description' | 'date'>;

const optionalExample: TransactionWithOptionalDescAndDate = {
    id: "123",
    amount: 1000,
    type: "income",
    // description и date опциональны
};

console.log(`   OptionalTransaction<'description' | 'date'>: поля description и date опциональны`);
console.log(`   Пример: ${JSON.stringify(optionalExample)}`);

// ==================== 3. Тестирование ReadonlyTransactionFields ====================

console.log("\n3. ReadonlyTransactionFields<TFields>:");

type TransactionReadonlyIdAndType = ReadonlyTransactionFields<'id' | 'type'>;

const readonlyExample: TransactionReadonlyIdAndType = {
    id: "123", // readonly
    amount: 1000,
    type: "income", // readonly
    date: "2024-01-01",
    description: "Тест"
};

console.log(`   ReadonlyTransactionFields<'id' | 'type'>: поля id и type только для чтения`);
console.log(`   Пример создан, попытка изменить id/type приведет к ошибке TypeScript`);

// ==================== 4. Тестирование IsIncome ====================

console.log("\n4. IsIncome<T>:");

type CheckIncome1 = IsIncome<{ type: 'income'; amount: number }>;
type CheckIncome2 = IsIncome<{ type: 'expense'; amount: number }>;
type CheckIncome3 = IsIncome<ITransaction>;

const check1: CheckIncome1 = true;
const check2: CheckIncome2 = false;
const check3: CheckIncome3 = false; // ITransaction может быть income или expense

console.log(`   IsIncome<{ type: 'income'; amount: number }>: ${check1}`);
console.log(`   IsIncome<{ type: 'expense'; amount: number }>: ${check2}`);
console.log(`   IsIncome<ITransaction>: ${check3} (так как type может быть income или expense)`);

// ==================== 5. Тестирование дополнительных типов ====================

console.log("\n5. Дополнительные типы:");

// TransactionByType
type IncomeTransaction = TransactionByType<'income'>;
const incomeTx: IncomeTransaction = {
    id: "123",
    amount: 1000,
    type: "income", // обязательно income
    date: "2024-01-01",
    description: "Зарплата",
    toString: () => ""
};

console.log(`   TransactionByType<'income'>: гарантирует что type = 'income'`);

// PartialExcept
type TransactionWithRequiredId = PartialExcept<'id'>;
const partialExample: TransactionWithRequiredId = {
    id: "123" 
};

console.log(`   PartialExcept<'id'>: только поле id обязательно`);

// ValidatedTransactionUpdate
type UpdateAmountOnly = ValidatedTransactionUpdate<'amount'>;
const updateExample: UpdateAmountOnly = {
    amount: 2000 
};

console.log(`   ValidatedTransactionUpdate<'amount'>: можно обновить только поле amount`);

// ==================== 6. Практическое применение ====================

console.log("\n6. Практическое применение:");

// Фильтрация транзакций по типу
function filterTransactions<T extends ITransaction>(
    transactions: T[],
    type: T['type']
): T[] {
    return transactions.filter(t => t.type === type);
}

// Создание безопасного объекта обновления
function createSafeUpdate<T extends keyof ITransaction>(
    field: T,
    value: ITransaction[T]
): ValidatedTransactionUpdate<T> {
    return { [field]: value } as ValidatedTransactionUpdate<T>;
}

const safeUpdate = createSafeUpdate('amount', 1500);
console.log(`   Создан безопасный update: ${JSON.stringify(safeUpdate)}`);

// Тип для UI компонента
type TransactionFormData = OptionalTransaction<'id' | 'date'> & {
    category?: string;
    tags?: string[];
};

console.log(`   TransactionFormData: тип для формы создания/редактирования`);

console.log("\nВсе Conditional Types и Mapped Types работают корректно");