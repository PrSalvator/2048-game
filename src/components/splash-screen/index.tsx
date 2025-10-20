import clsx from "clsx";
import { useGameContext } from "../../context/game/hook";
import { EGameState } from "../../shared/enum";
import { WonSplashScreen } from "./won";
import { LostSplashScreen } from "./lost";

const SplashScreen = () => {
  const { gameState, score } = useGameContext();

  return (
    <div
      className={clsx("splash-screen__wrapper", { invisiable: gameState === EGameState.PLAYING })}
    >
      {gameState === EGameState.WON && <WonSplashScreen score={score} />}
      {gameState === EGameState.LOST && <LostSplashScreen score={score} />}
    </div>
  );
};

export { SplashScreen };
