import { isNil } from 'lodash-es';
import type { ELocalStorageKey } from '../../enum';
import type { ILocalStorageService } from './interface';

class LocalStorageService implements ILocalStorageService {
    protected readonly storage;

    constructor() {
        this.storage = window.localStorage;
    }

    get<T>(key: ELocalStorageKey): T | null;
    get<T>(key: ELocalStorageKey, defaultValue: T): T;
    get<T>(key: ELocalStorageKey, defaultValue?: T): T | null {
        try {
            const item = this.storage.getItem(key);
            if (isNil(item)) {
                return (defaultValue as T) ?? null;
            }
            return JSON.parse(item) as T;
        } catch (error) {
            console.error('Ошибка при получении из localStorage:', error);
            return (defaultValue as T) ?? null;
        }
    }

    set(key: ELocalStorageKey, value: unknown) {
        try {
            const serializedValue = JSON.stringify(value);
            this.storage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Ошибка при сохранении в localStorage:', error);
        }
    }
}

export { LocalStorageService };
