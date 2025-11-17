import { cloneDeep, isNil } from 'lodash-es';
import type { IGameReducerAction, IGameReducerState } from './interface';
import { getRandomTileValue, initializeGrid } from '../../../shared/utils';
import { EDirection } from '../../../shared/enum';
import type { ITile, ITileMap } from '../../../models/tile';
import { TILES_PER_ROW_COUNT } from '../../../shared/const';
import { INITIAL_REDUCER_STATE } from '../const';

const gameReducer = (state: IGameReducerState, action: IGameReducerAction): IGameReducerState => {
    switch (action.type) {
        case 'create_tile': {
            const tileId = crypto.randomUUID();
            const { row, column } = action.coordinates;

            const newGrid = cloneDeep(state.grid);

            newGrid[row][column] = tileId;

            return {
                ...state,
                grid: newGrid,
                tiles: {
                    ...state.tiles,
                    [tileId]: {
                        id: tileId,
                        coordinates: action.coordinates,
                        value: getRandomTileValue(),
                    },
                },
            };
        }
        case 'move_tiles': {
            const { direction } = action;

            return moveTiles(direction, state);
        }
        case 'merge_tiles': {
            const newTiles: ITileMap = {};

            const gridTilesIds = state.grid.flat();

            Object.values(state.tiles).forEach((tile) => {
                if (gridTilesIds.some((tileId) => tile.id === tileId)) {
                    newTiles[tile.id] = tile;
                }
            });

            return { ...state, tiles: newTiles, isStateUpdated: false };
        }
        case 'set_game_state': {
            const { gameState } = action;

            return { ...state, gameState };
        }
        case 'reset': {
            return INITIAL_REDUCER_STATE;
        }
        default: {
            return state;
        }
    }
};

/**
 * Возвращает состояние редьюсера после перемещения плиток (Плитки остаются не смерженные!)
 * @param direction - Направление движения
 * @param prevState - Состояние редьюсера
 * @returns Новое состояние редьюсера
 */

const moveTiles = (direction: EDirection, prevState: IGameReducerState): IGameReducerState => {
    const { grid, tiles, score } = prevState;

    const newGrid = initializeGrid();
    const newTiles: ITileMap = cloneDeep(tiles);
    let newScore = score;
    let isStateUpdated = false;

    switch (direction) {
        case EDirection.DOWN: {
            for (let column = TILES_PER_ROW_COUNT - 1; column !== -1; column--) {
                let prevRow = TILES_PER_ROW_COUNT - 1; // Идем с конца, если встречаются одинаковые, то пересатавляем на этот индекс
                let prevTile: undefined | ITile;

                for (let row = TILES_PER_ROW_COUNT - 1; row !== -1; row--) {
                    const tileId = grid[row][column];

                    if (!isNil(tileId)) {
                        const currentTile = tiles[tileId];

                        if (prevTile?.value === currentTile.value) {
                            newScore += prevTile.value * 2;

                            newTiles[prevTile.id].value = prevTile.value * 2;

                            newTiles[currentTile.id] = { ...currentTile, coordinates: prevTile.coordinates };

                            prevTile = undefined;
                            isStateUpdated = true;

                            continue;
                        }

                        if (prevRow !== currentTile.coordinates.row) {
                            isStateUpdated = true;
                        }

                        prevTile = { ...currentTile, coordinates: { row: prevRow, column } };

                        newTiles[prevTile.id] = prevTile;
                        newGrid[prevRow][column] = tileId;

                        prevRow = prevRow - 1;
                    }
                }
            }

            return { ...prevState, grid: newGrid, tiles: newTiles, isStateUpdated, score: newScore };
        }
        case EDirection.TOP: {
            for (let column = 0; column !== TILES_PER_ROW_COUNT; column++) {
                let prevRow = 0;
                let prevTile: undefined | ITile;

                for (let row = 0; row !== TILES_PER_ROW_COUNT; row++) {
                    const tileId = grid[row][column];

                    if (!isNil(tileId)) {
                        const currentTile = tiles[tileId];

                        if (prevTile?.value === currentTile.value) {
                            newScore += prevTile.value * 2;

                            newTiles[prevTile.id].value = prevTile.value * 2;

                            newTiles[currentTile.id] = { ...currentTile, coordinates: prevTile.coordinates };

                            prevTile = undefined;
                            isStateUpdated = true;

                            continue;
                        }

                        if (prevRow !== currentTile.coordinates.row) {
                            isStateUpdated = true;
                        }

                        prevTile = { ...currentTile, coordinates: { row: prevRow, column } };

                        newTiles[prevTile.id] = prevTile;
                        newGrid[prevRow][column] = tileId;

                        prevRow = prevRow + 1;
                    }
                }
            }

            return { ...prevState, grid: newGrid, tiles: newTiles, isStateUpdated, score: newScore };
        }
        case EDirection.RIGHT: {
            for (let row = TILES_PER_ROW_COUNT - 1; row !== -1; row--) {
                let prevColumn = TILES_PER_ROW_COUNT - 1; // Идем с конца, если встречаются одинаковые, то пересатавляем на этот индекс
                let prevTile: undefined | ITile;

                for (let column = TILES_PER_ROW_COUNT - 1; column !== -1; column--) {
                    const tileId = grid[row][column];

                    if (!isNil(tileId)) {
                        const currentTile = tiles[tileId];

                        if (prevTile?.value === currentTile.value) {
                            newScore += prevTile.value * 2;

                            newTiles[prevTile.id].value = prevTile.value * 2;

                            newTiles[currentTile.id] = { ...currentTile, coordinates: prevTile.coordinates };

                            prevTile = undefined;
                            isStateUpdated = true;

                            continue;
                        }

                        if (prevColumn !== currentTile.coordinates.column) {
                            isStateUpdated = true;
                        }

                        prevTile = { ...currentTile, coordinates: { row, column: prevColumn } };

                        newTiles[prevTile.id] = prevTile;
                        newGrid[row][prevColumn] = tileId;

                        prevColumn = prevColumn - 1;
                    }
                }
            }

            return { ...prevState, grid: newGrid, tiles: newTiles, isStateUpdated, score: newScore };
        }
        case EDirection.LEFT: {
            for (let row = 0; row !== TILES_PER_ROW_COUNT; row++) {
                let prevColumn = 0;
                let prevTile: undefined | ITile;

                for (let column = 0; column !== TILES_PER_ROW_COUNT; column++) {
                    const tileId = grid[row][column];

                    if (!isNil(tileId)) {
                        const currentTile = tiles[tileId];

                        if (prevTile?.value === currentTile.value) {
                            newScore += prevTile.value * 2;

                            newTiles[prevTile.id].value = prevTile.value * 2;

                            newTiles[currentTile.id] = { ...currentTile, coordinates: prevTile.coordinates };

                            prevTile = undefined;
                            isStateUpdated = true;

                            continue;
                        }

                        if (prevColumn !== currentTile.coordinates.column) {
                            isStateUpdated = true;
                        }

                        prevTile = { ...currentTile, coordinates: { row, column: prevColumn } };

                        newTiles[prevTile.id] = prevTile;
                        newGrid[row][prevColumn] = tileId;

                        prevColumn = prevColumn + 1;
                    }
                }
            }

            return { ...prevState, grid: newGrid, tiles: newTiles, isStateUpdated, score: newScore };
        }
        default: {
            return prevState;
        }
    }
};

export { gameReducer };
