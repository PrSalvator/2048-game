import { useMemo, type CSSProperties } from 'react';
import { useGameContext } from '../../context/game/hook';
import { TILES_PER_ROW_COUNT } from '../../shared/const';
import { Tile } from '../tile';
import { useTileSize } from '../../hooks/use-tile-size';

const Grid = () => {
    const { grid, tiles } = useGameContext();

    const { tileSize, gap } = useTileSize();

    const style: CSSProperties = useMemo(() => {
        const gridSize = TILES_PER_ROW_COUNT * tileSize + gap * (TILES_PER_ROW_COUNT - 1);

        return {
            width: gridSize,
            height: gridSize,
            gridTemplateRows: `repeat(${TILES_PER_ROW_COUNT}, 1fr)`,
            gridTemplateColumns: `repeat(${TILES_PER_ROW_COUNT}, 1fr)`,
            gap: gap,
        };
    }, [tileSize, gap]);

    return (
        <div className="grid-wrapper">
            <div className="grid" style={style}>
                {tiles.map((tile) => (
                    <Tile {...tile} key={`tile-${tile.id}`} />
                ))}

                {grid.flat().map((_, index) => (
                    <div className="tile empty" key={`bg-tile-${index}`} />
                ))}
            </div>
        </div>
    );
};

export { Grid };
