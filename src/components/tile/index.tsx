import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { ITile } from "../../models/tile";
import { getPixelPositionFromCoordinates } from "../../shared/utils";
import { TILE_ANIMATION_DURATION } from "../../shared/const";
import clsx from "clsx";
import { useTileSize } from "../../hooks/use-tile-size";

const Tile = ({ value, coordinates }: ITile) => {
  const prevValueRef = useRef<number>(undefined);

  const { tileSize, gap } = useTileSize();

  const [scale, setScale] = useState<number>(1);

  const style: CSSProperties = useMemo(
    () => ({
      ...getPixelPositionFromCoordinates(coordinates, tileSize, gap),
      transform: `scale(${scale})`,
      zIndex: value,
      transitionDuration: `${TILE_ANIMATION_DURATION}ms`,
      width: tileSize,
      height: tileSize,
    }),
    [coordinates, scale, value, tileSize, gap]
  );

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setScale(1.1);
      setTimeout(() => {
        setScale(1);
      }, TILE_ANIMATION_DURATION);

      prevValueRef.current = value;
    }
  }, [value]);

  return (
    <div className={clsx("tile", `tile--${value}`)} style={style}>
      {value}
    </div>
  );
};

export { Tile };
