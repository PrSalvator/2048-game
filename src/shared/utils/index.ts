import { isNil } from "lodash-es";
import type { IGridTilesIds } from "../../models/grid";
import type { ITileMap } from "../../models/tile";
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

const checkMovePossibility = (tilesMap: ITileMap): boolean => {
  const tilesArray = Object.values(tilesMap);
  let isPossible = false;

  // Быстрая проверка на пустые клетки
  if (tilesArray.length < TILES_PER_ROW_COUNT * TILES_PER_ROW_COUNT) return true;

  for (const tile of tilesArray) {
    const {
      value,
      coordinates: { row, column },
    } = tile;

    if (column < TILES_PER_ROW_COUNT - 1) {
      // Проверка правого соседа
      const rightTile = tilesMap[`${row}.${column + 1}`];

      if (rightTile.value === value) {
        isPossible = true;
        break;
      }
    }

    if (row < TILES_PER_ROW_COUNT - 1) {
      // Проверка нижнего соседа
      const bottomTile = tilesMap[`${row + 1}.${column}`];
      if (bottomTile.value === value) {
        isPossible = true;
        break;
      }
    }
  }

  return isPossible;
};

const getEmptyTilesCoordinates = (grid: IGridTilesIds): ICoordinates[] => {
  const emptyTilesCoordinates: ICoordinates[] = [];

  for (let row = 0; row < TILES_PER_ROW_COUNT; row++) {
    for (let column = 0; column < TILES_PER_ROW_COUNT; column++) {
      const tile = grid[row][column];

      if (isNil(tile)) emptyTilesCoordinates.push({ row, column });
    }
  }

  return emptyTilesCoordinates;
};

export {
  getPixelPositionFromCoordinates,
  initializeGrid,
  getRandomTileValue,
  checkMovePossibility,
  getEmptyTilesCoordinates,
};
