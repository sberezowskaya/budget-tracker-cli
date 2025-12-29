export function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        console.log(`Вызов метода ${propertyKey} с аргументами:`, args);
        
        const result = originalMethod.apply(this, args);
        
        console.log(`Метод ${propertyKey} вернул:`, result);
        
        return result;
    };
    
    return descriptor;
}

export function LogMethodWithOptions(options: { logArgs?: boolean; logResult?: boolean } = {}) {
    const { logArgs = true, logResult = true } = options;
    
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            if (logArgs) {
                console.log(`[LOG] Вызов метода ${propertyKey} с аргументами:`, args);
            } else {
                console.log(`[LOG] Вызов метода ${propertyKey}`);
            }
            
            const result = originalMethod.apply(this, args);
            
            if (logResult) {
                console.log(`[LOG] Метод ${propertyKey} вернул:`, result);
            }
            
            return result;
        };
        
        return descriptor;
    };
}