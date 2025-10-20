import { useGameContext } from "../../context/game/hook";
import { Button } from "../../shared/components/button";

const RestartButton = () => {
  const { restartGame } = useGameContext();
  return <Button onClick={restartGame}>Restart</Button>;
};

export { RestartButton };
