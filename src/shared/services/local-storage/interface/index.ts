import type { ELocalStorageKey } from "../../../enum";

interface ILocalStorageService {
  /**
   * Получить данные из localStorage
   * @param {string} key - Ключ для получения
   * @param {*} defaultValue - Значение по умолчанию, если ключ не найден
   * @returns {*} - Полученное значение или defaultValue
   */
  get: <T>(key: ELocalStorageKey, defaultValue?: T) => T | null;

  /**
   * Сохранить данные в localStorage
   * @param {string} key - Ключ для сохранения
   * @param {*} value - Значение для сохранения (будет преобразовано в JSON)
   */
  set: (key: ELocalStorageKey, value: unknown) => void;
}

export type { ILocalStorageService };
