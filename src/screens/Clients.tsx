import { CSSProperties } from "react";
import { Header } from "../components/Header";
import { ScreenMenu, ScreenMenuProps } from "../components/ScreenMenu";
import { Read } from "../components/Clients/Read";
import { useQuery } from "react-query";
import { SCREEN_MODE } from "../constants";
import { Spinner } from "@blueprintjs/core";
import { Create } from "../components/Clients/Create";
import { useScreen } from "../hooks";
import { getClients } from "../queries/client";

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = useScreen();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  const { data, isLoading } = useQuery("Clients", getClients);

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: () => {},
    onEditClick: () => {},
    onSaveClick: () => {},
  };

  return (
    <div style={styles.container as CSSProperties}>
      <Header title="CLIENTES" />
      <ScreenMenu
        screenMode={{ screenMode, setScreenMode }}
        actions={actions}
      />

      {(() => {
        if (isLoading) {
          return <Spinner size={110} />;
        }

        if (screenMode === SCREEN_MODE.NEW) {
          return <Create />;
        }

        if (screenMode === SCREEN_MODE.VIEW) {
          return <Read clients={data?.data ?? []} />;
        }
      })()}
    </div>
  );
};
