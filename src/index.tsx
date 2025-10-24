import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { GameProvider } from "./context/game";

import { Layout } from "./components/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <Layout />
    </GameProvider>
  </StrictMode>
);
