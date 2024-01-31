import { CSSProperties, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { ScreenMenu, ScreenMenuProps } from "../components/ScreenMenu";
import { Read } from "../components/Clients/Read";
import { useQuery } from "react-query";
import { SCREEN_MODE } from "../constants";
import { Spinner } from "@blueprintjs/core";
import { Create } from "../components/Clients/Create";

export const Clients = () => {
  const [screenMode, setScreenMode] = useState<SCREEN_MODE>(SCREEN_MODE.VIEW);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  const getClients = async () => {
    try {
      const client = await axios.get("http://localhost:3001/clients");
      return client;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading } = useQuery("Clients", getClients);

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: () => {
      setScreenMode(SCREEN_MODE.NEW);
    },
    onEditClick: () => {
      setScreenMode(SCREEN_MODE.EDIT);
    },
    onSaveClick: () => {
      setScreenMode(SCREEN_MODE.VIEW);
    },
  };

  return (
    <div style={styles.container as CSSProperties}>
      <Header title="CLIENTES" />
      <ScreenMenu actions={actions} />

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
