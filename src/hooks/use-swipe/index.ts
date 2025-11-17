// hooks/useSwipe.ts
import { useCallback } from 'react';
import { EDirection } from '../../shared/enum';
import { MAX_SWIPE_DIFF } from '../../shared/const';

export const useSwipe = (onSwipe: (direction: EDirection) => void) => {
    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            e.preventDefault();

            const touch = e.touches[0];
            const startX = touch.clientX;
            const startY = touch.clientY;

            const handleTouchMove = (moveEvent: TouchEvent) => {
                if (moveEvent.touches.length > 1) {
                    return;
                }

                const touch = moveEvent.touches[0];
                const diffX = touch.clientX - startX;
                const diffY = touch.clientY - startY;

                if (Math.abs(diffX) < MAX_SWIPE_DIFF && Math.abs(diffY) < MAX_SWIPE_DIFF) {
                    return;
                }

                if (Math.abs(diffX) > Math.abs(diffY)) {
                    onSwipe(diffX > 0 ? EDirection.RIGHT : EDirection.LEFT);
                } else {
                    onSwipe(diffY > 0 ? EDirection.DOWN : EDirection.TOP);
                }

                document.removeEventListener('touchmove', handleTouchMove);
            };

            const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };

            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        },
        [onSwipe],
    );

    return { handleTouchStart };
};
