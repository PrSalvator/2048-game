import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { Grid } from "./components/grid";
import { GameProvider } from "./context/game";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <Grid />
    </GameProvider>
  </StrictMode>
);
