import { Button, Spinner } from "@blueprintjs/core";
import { CSSProperties, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { ScreenMenu } from "../components/ScreenMenu";
import { Cell, Column, Table2 } from "@blueprintjs/table";

export const Clients = () => {
  const [nome, setNome] = useState("");
  const [phone, setPhone] = useState("");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  const createClient = async (name: string, phone: string) => {
    try {
      const client = await axios.post("http://localhost:3001/clients", {
        name: name,
        phone: phone,
      });
      return client;
    } catch (error) {
      console.error(error);
    }
  };

  const dollarCellRenderer = (rowIndex: number) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
  );
  const euroCellRenderer = (rowIndex: number) => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
  );

  return (
    <div style={styles.container as CSSProperties}>
      <Header title="CLIENTES" />
      <ScreenMenu />

      {/* <Spinner intent="primary" /> */}

      <input
        type="text"
        className="bp5-input"
        placeholder="nome"
        onChange={(evt) => {
          setNome(evt.target.value);
        }}
      />

      <input
        type="text"
        className="bp5-input"
        placeholder="phone"
        onChange={(evt) => {
          setPhone(evt.target.value);
        }}
      />

      <Table2 numRows={10}>
        <Column name="Dollars" cellRenderer={dollarCellRenderer} />
        <Column name="Euros" cellRenderer={euroCellRenderer} />
      </Table2>

      <Button
        intent="success"
        onClick={async () => {
          const response = await createClient(nome, phone);
          console.log(response?.data);
        }}
      >
        Criar cliente
      </Button>
    </div>
  );
};
