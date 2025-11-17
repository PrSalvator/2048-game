import type { ELocalStorageKey } from '../../../enum';

interface ILocalStorageService {
    /**
     * Получить данные из localStorage без значения по умолчанию
     * @param {string} key - Ключ для получения
     * @returns {T | null} - Полученное значение или null если не найдено
     */
    get<T>(key: ELocalStorageKey): T | null;

    /**
     * Получить данные из localStorage со значением по умолчанию
     * @param {string} key - Ключ для получения
     * @param {T} defaultValue - Значение по умолчанию, если ключ не найден
     * @returns {T} - Полученное значение или defaultValue
     */
    get<T>(key: ELocalStorageKey, defaultValue: T): T;

    /**
     * Сохранить данные в localStorage
     * @param {string} key - Ключ для сохранения
     * @param {*} value - Значение для сохранения (будет преобразовано в JSON)
     */
    set: (key: ELocalStorageKey, value: unknown) => void;
}

export type { ILocalStorageService };
