import type { ELocalStorageKey } from "../../enum";
import type { ILocalStorageService } from "./interface";

class LocalStorageService implements ILocalStorageService {
  protected readonly storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T>(key: ELocalStorageKey, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue ? defaultValue : null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error("Ошибка при получении из localStorage:", error);
      return defaultValue ?? null;
    }
  }

  set(key: ELocalStorageKey, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Ошибка при сохранении в localStorage:", error);
    }
  }
}

export { LocalStorageService };
