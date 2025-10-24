import { Footer } from "../footer";
import { Grid } from "../grid";
import { Header } from "../header";
import { SplashScreen } from "../splash-screen";
import { StatusBoard } from "../status-board";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <div className="layout">
        <Header />
        <StatusBoard />
        <Grid />
        <Footer />
        <SplashScreen />
      </div>
    </div>
  );
};

export { Layout };
