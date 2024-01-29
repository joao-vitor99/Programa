import { CSSProperties } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { ScreenMenu } from "../components/ScreenMenu";
import { Read } from "../components/Clients/Read";
import { useQuery } from "react-query";

export const Clients = () => {
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

  useQuery("Clients", getClients)

  return (
    <div style={styles.container as CSSProperties}>
      <Header title="CLIENTES" />
      <ScreenMenu />

      <Read />
    </div>
  );
};
