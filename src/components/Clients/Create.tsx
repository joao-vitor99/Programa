import { InputGroup, Label } from "@blueprintjs/core";
import { createStyleMap } from "../../utils";
import { useState } from "react";

export const Create = () => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      gap: "0.5rem",
    },
  });

  const [nome, setNome] = useState<string>();
  const [telefone, setTelefone] = useState<string>();

  return (
    <div style={styles.container}>
      <Label style={{width:"250px"}}>
        Nome:
        <InputGroup
          large
          placeholder="Nome"
          fill
          value={nome}
          onChange={(event) => {
            const value = event.target.value;
            setNome(value);
          }}
        />
      </Label>

      <Label style={{width:"250px"}}>
        Telefone:
        <InputGroup
          large
          placeholder="Telefone"
          fill
          value={telefone}
          onChange={(event) => {
            const value = event.target.value;
            setTelefone(value);
          }}
        />
      </Label>
    </div>
  );
};
