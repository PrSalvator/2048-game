import type { CSSProperties } from "react";
import { useGameContext } from "../../context/game/hook";
import { TILE_GAP, TILES_PER_ROW_COUNT, TILE_SIZE } from "../../shared/const";
import { Tile } from "../tile";

const GRID_SIZE = TILES_PER_ROW_COUNT * TILE_SIZE + TILE_GAP * (TILES_PER_ROW_COUNT - 1);

const GRID_STYLE: CSSProperties = {
  width: GRID_SIZE,
  height: GRID_SIZE,
  gridTemplateRows: `repeat(${TILES_PER_ROW_COUNT}, 1fr)`,
  gridTemplateColumns: `repeat(${TILES_PER_ROW_COUNT}, 1fr)`,
  gap: TILE_GAP,
};

const Grid = () => {
  const { grid, tiles } = useGameContext();

  return (
    <div className="grid-wrapper">
      <div className="grid" style={GRID_STYLE}>
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
