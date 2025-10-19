import type { IGridTilesIds } from "../../models/grid";
import { TILE_GAP, TILES_PER_ROW_COUNT, TILE_SIZE } from "../const";
import type { ICoordinates } from "../interface";

/**
 * Преобразует координаты ячейки в пиксельные координаты для отрисовки
 *
 * @param coordinates - Объект с координатами ячейки на игровом поле
 *
 * @returns Объект с пиксельными координатами {left: number, top: number}
 */
const getPixelPositionFromCoordinates = ({ row, column }: ICoordinates) => {
  const left = column * TILE_SIZE + column * TILE_GAP; // С учетом расстояния между плитками

  const top = row * TILE_SIZE + row * TILE_GAP; // С учетом расстояния между плитками

  return { left, top };
};

const initializeGrid = (): IGridTilesIds => {
  return Array.from({ length: TILES_PER_ROW_COUNT }, () =>
    Array(TILES_PER_ROW_COUNT).fill(undefined)
  );
};

/**
 * Возвращает рандомное значение плитки (используется при создании)
 *
 * @returns 2 (90%) или 4 (10%)
 */
const getRandomTileValue = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

export { getPixelPositionFromCoordinates, initializeGrid, getRandomTileValue };
