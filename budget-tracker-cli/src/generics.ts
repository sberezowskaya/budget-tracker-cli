// Часть 1. Интерфейсы

// Интерфейс для объектов с идентификатором
export interface Identifiable {
    id: number;
}

// Интерфейс для объектов с описанием
export interface Describable {
    describe(): string;
}

// Часть 2. Универсальный класс GenericStorage<T>
export class GenericStorage<T extends Identifiable> {
    private items: T[] = [];

    // Добавить элемент в хранилище
    add(item: T): void {
        this.items.push(item);
    }

    // Удалить элемент по id
    removeById(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return initialLength > this.items.length;
    }

    // Получить элемент по id
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    // Получить копию всех элементов
    getAll(): T[] {
        return [...this.items]; // Возвращаем копию для инкапсуляции
    }

    // Часть 3. Метод describeAll()
    describeAll(): void {
        if (this.items.length === 0) {
            console.log("Хранилище пусто.");
            return;
        }

        console.log(`=== Описание всех элементов (всего: ${this.items.length}) ===`);
        
        this.items.forEach(item => {
            // Проверяем, реализует ли элемент интерфейс Describable
            if ('describe' in item && typeof (item as any).describe === 'function') {
                const describableItem = item as T & Describable;
                console.log(describableItem.describe());
            } else {
                console.log(`Элемент id: ${item.id} не содержит описания.`);
            }
        });
    }
}

// Часть 4. Класс Product
export class Product implements Identifiable, Describable {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}

    describe(): string {
        return `Product #${this.id}: ${this.name}, price: $${this.price}`;
    }
}

// Проверка решения
export function testGenerics(): void {
    console.log("\n" + "=".repeat(50));
    console.log("Тестирование Generics");
    console.log("=".repeat(50));

    // Создаем хранилище для продуктов
    const productStorage = new GenericStorage<Product>();

    // Добавляем продукты
    console.log("\n1. Добавление продуктов:");
    productStorage.add(new Product(1, 'Ноутбук', 150000));
    productStorage.add(new Product(2, 'Смартфон', 80000));
    productStorage.add(new Product(3, 'Планшет', 50000));
    console.log("Продукты добавлены");

    // Проверяем describeAll()
    console.log("\n2. Описание всех продуктов:");
    productStorage.describeAll();

    // Добавляем объект без describe()
    console.log("\n3. Добавление объекта без метода describe():");
    productStorage.add({ id: 4 } as Product);
    
    console.log("\n4. Описание всех элементов (включая объект без describe):");
    productStorage.describeAll();

    // Тестируем другие методы
    console.log("\n5. Тестирование других методов:");

    // Получение по ID
    const product2 = productStorage.getById(2);
    console.log(`   Получен продукт с ID 2:`, product2 ? product2.describe() : "Не найден");

    // Удаление
    const removed = productStorage.removeById(1);
    console.log(`   Удалён продукт с ID 1: ${removed ? 'Да' : 'Нет'}`);

    // Все продукты после удаления
    console.log("\n6. Все продукты после удаления:");
    const allProducts = productStorage.getAll();
    allProducts.forEach(product => {
        if ('describe' in product) {
            console.log(`   ${product.describe()}`);
        }
    });

    // Тестируем с другим типом данных
    console.log("\n7. Тестирование с другим типом данных:");
    
    // Создаем интерфейс и класс для другого типа
    interface User extends Identifiable, Describable {
        id: number;
        username: string;
        email: string;
    }

    class AppUser implements User {
        constructor(
            public id: number,
            public username: string,
            public email: string
        ) {}

        describe(): string {
            return `User #${this.id}: ${this.username} (${this.email})`;
        }
    }

    // Создаем хранилище для пользователей
    const userStorage = new GenericStorage<AppUser>();
    userStorage.add(new AppUser(1, 'john_doe', 'john@example.com'));
    userStorage.add(new AppUser(2, 'jane_doe', 'jane@example.com'));

    console.log("\n   Описание пользователей:");
    userStorage.describeAll();

    console.log("\n" + "=".repeat(50));
    console.log("Тестирование Generics завершено!");
    console.log("=".repeat(50) + "\n");
}