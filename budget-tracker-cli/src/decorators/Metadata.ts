import 'reflect-metadata';

// Ключи для метаданных
export const METADATA_KEYS = {
    DESCRIPTION: 'metadata:description',
    CATEGORY: 'metadata:category',
    VERSION: 'metadata:version'
};

/**
 * Декоратор для сохранения метаданных свойства
 * @param key - ключ метаданных
 * @param value - значение метаданных
 */
export function Metadata(key: string, value: any) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(key, value, target, propertyKey);
    };
}

/**
 * Получить метаданные свойства
 * @param target - объект или прототип
 * @param propertyKey - имя свойства
 * @param key - ключ метаданных
 */
export function getMetadata<T>(target: any, propertyKey: string, key: string): T | undefined {
    return Reflect.getMetadata(key, target, propertyKey);
}

/**
 * Декоратор для добавления описания свойства
 * @param description - описание свойства
 */
export function Description(description: string) {
    return Metadata(METADATA_KEYS.DESCRIPTION, description);
}

/**
 * Декоратор для указания категории свойства
 * @param category - категория свойства
 */
export function Category(category: string) {
    return Metadata(METADATA_KEYS.CATEGORY, category);
}