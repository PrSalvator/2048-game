import { useEffect, useState } from "react";
import { ELocalStorageKey } from "../../shared/enum";
import { LocalStorageService } from "../../shared/services/local-storage";

const localStorageService = new LocalStorageService();

const useGameScore = (score: number) => {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const savedBestScore = localStorageService.get<number>(ELocalStorageKey.BEST_SCORE, 0);
    setBestScore(savedBestScore);
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorageService.set(ELocalStorageKey.BEST_SCORE, score);
    }
  }, [score, bestScore]);

  return { bestScore };
};

export { useGameScore };
