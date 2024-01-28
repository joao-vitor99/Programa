import { ButtonGroup, Button } from "@blueprintjs/core";
import { createStyleMap } from "../utils";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

export const Home = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const isCurrentScreenSelected = (route: ROUTES, selectedScreen: string) => {
    return selectedScreen.includes(route);
  };

  const styles = createStyleMap({
    container: {
      display: "flex",
      height: "100vh",
    },

    menuButtonsContainer: {
      height: "max-content",
    },

    logoContainer: {
      display: "flex",
      justifyContent: "center",
      height: "60px",
      backgroundColor: "red",
      color: "white",
    },

    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0.5rem",
    },
    content: {
      width: "100%",
      padding: "0.5rem",
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>logo</div>
        <div style={styles.menuButtonsContainer}>
          <ButtonGroup vertical fill large>
            <Button
              intent={
                isCurrentScreenSelected(ROUTES.CLIENTS, location.pathname)
                  ? "primary"
                  : "none"
              }
              icon="person"
              onClick={() => {
                navigate(ROUTES.CLIENTS);
              }}
            >
              Clientes
            </Button>
            <Button icon="annotation">Pedidos</Button>
          </ButtonGroup>
        </div>
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
