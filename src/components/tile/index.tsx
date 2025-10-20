import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ITile } from "../../models/tile";
import { getPixelPositionFromCoordinates } from "../../shared/utils";
import { TILE_ANIMATION_DURATION, TILE_SIZE } from "../../shared/const";
import clsx from "clsx";

const Tile = ({ value, coordinates }: ITile) => {
  const prevValueRef = useRef<number>(undefined);

  const [scale, setScale] = useState<number>(1);

  const style: CSSProperties = {
    ...getPixelPositionFromCoordinates(coordinates),
    width: TILE_SIZE,
    height: TILE_SIZE,
    transform: `scale(${scale})`,
    zIndex: value,
    transitionDuration: `${TILE_ANIMATION_DURATION}ms`,
  };

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
    <div className={clsx("tile", `tile${value}`)} style={style}>
      {value}
    </div>
  );
};

export { Tile };
