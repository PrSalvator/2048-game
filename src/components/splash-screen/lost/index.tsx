import { RestartButton } from "../../restart-button";
import type { ISplashScreenProps } from "../interface";

const LostSplashScreen = ({ score }: ISplashScreenProps) => {
  return (
    <div className="lost-splash-screen">
      <h1>You lose</h1>
      <h2>Bad luck!</h2>
      <h1>Your score:</h1>
      <h1>{score}</h1>
      <RestartButton />
    </div>
  );
};

export { LostSplashScreen };
