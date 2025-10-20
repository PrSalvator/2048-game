import clsx from "clsx";
import { useGameContext } from "../../context/game/hook";
import { EGameState } from "../../shared/enum";
import { WonSplashScreen } from "./won";
import { LostSplashScreen } from "./lost";
import { useEffect, useState } from "react";
import { TILE_ANIMATION_DURATION } from "../../shared/const";

const SplashScreen = () => {
  const { gameState, score } = useGameContext();
  const [isGamePlaying, setIsGamePlaying] = useState(gameState === EGameState.PLAYING);

  useEffect(() => {
    if (gameState !== EGameState.PLAYING)
      setTimeout(() => setIsGamePlaying(false), TILE_ANIMATION_DURATION * 2);

    if (isGamePlaying === false && gameState === EGameState.PLAYING) setIsGamePlaying(true);
  }, [gameState]);

  return (
    <div className={clsx("splash-screen__wrapper", { invisiable: isGamePlaying })}>
      {gameState === EGameState.WON && <WonSplashScreen score={score} />}
      {gameState === EGameState.LOST && <LostSplashScreen score={score} />}
    </div>
  );
};

export { SplashScreen };
