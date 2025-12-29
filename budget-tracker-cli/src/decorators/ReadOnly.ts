export function ReadOnly(target: any, propertyKey: string) {
    const descriptor: PropertyDescriptor = {
        get() {
            return (this as any)[`_${propertyKey}`];
        },
        set(value: any) {
            if ((this as any)[`_${propertyKey}`] === undefined) {
                (this as any)[`_${propertyKey}`] = value;
            } else {
                console.warn(`Свойство ${propertyKey} защищено от изменений. Текущее значение:`, (this as any)[`_${propertyKey}`]);

            }
        },
        enumerable: true,
        configurable: false
    };
    
    Object.defineProperty(target, propertyKey, descriptor);
}

export function ReadOnlyAlt(target: any, propertyKey: string): void {
    let value: any;
    
    const getter = function () {
        return value;
    };
    
    const setter = function (newValue: any) {
        if (value === undefined) {
            value = newValue;
        } else {
            throw new Error(`Свойство ${propertyKey} доступно только для чтения. Попытка изменить значение с ${value} на ${newValue}`);
        }
    };
    
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: false
    });
}