import { useMemo } from 'react';
import { useBreakpoint } from '../use-breakpoint';
import { EBreakPoint, EGapSize, ETilseSize } from '../../shared/enum';

const useTileSize = () => {
    const { breakpoint } = useBreakpoint();

    const { tilesSize: tileSize, gap } = useMemo(() => {
        if (breakpoint === EBreakPoint.DESKTOP) {
            return { tilesSize: ETilseSize.XL, gap: EGapSize.XL };
        }
        if (breakpoint === EBreakPoint.LAPTOP) {
            return { tilesSize: ETilseSize.L, gap: EGapSize.L };
        }

        return { tilesSize: ETilseSize.M, gap: EGapSize.M };
    }, [breakpoint]);

    return { tileSize, gap };
};

export { useTileSize };
