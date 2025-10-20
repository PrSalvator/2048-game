import { Grid } from "../grid";
import { SplashScreen } from "../splash-screen";
import { StatusBoard } from "../status-board";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <div className="layout">
        <StatusBoard />
        <Grid />
        <SplashScreen />
      </div>
    </div>
  );
};

export { Layout };
