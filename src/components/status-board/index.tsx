import { useGameContext } from "../../context/game/hook";
import { Label } from "../../shared/components/label";
import { RestartButton } from "../restart-button";

const StatusBoard = () => {
  const { score, bestScore } = useGameContext();
  return (
    <div className="status-board">
      <Label text="Score" value={score} />
      <Label text="Best" value={bestScore} type="yellow" />
      <RestartButton />
    </div>
  );
};

export { StatusBoard };
