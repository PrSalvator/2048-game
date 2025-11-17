import { RestartButton } from '../../restart-button';
import type { ISplashScreenProps } from '../interface';

const WonSplashScreen = ({ score }: ISplashScreenProps) => {
    return (
        <div className="won-splash-screen">
            <h1>You win</h1>
            <h2>Congratulations!</h2>
            <h1>Your score:</h1>
            <h1>{score}</h1>
            <RestartButton />
        </div>
    );
};

export { WonSplashScreen };
