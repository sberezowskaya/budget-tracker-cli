export function LogClass<T extends { new (...args: any[]): {} }>(target: T) {
    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            console.log(`Создан экземпляр класса ${target.name} с аргументами:`, args);
        }
    };
}