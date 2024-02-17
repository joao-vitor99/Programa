import { Button } from "@blueprintjs/core";
import { SCREEN_MODE } from "../constants";
import { createStyleMap } from "../utils";
import { useContext, useEffect } from "react";
import { ScreenLocalContext } from "../context/ScreenLocalContext";

export interface ScreenMenuProps {
  screenMode: {
    screenMode: SCREEN_MODE;
    setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>;
  };
  actions?: {
    onNewClick?: (changeScreen: () => void) => void;
    onEditClick?: (changeScreen: () => void) => void;
    onSaveClick?: (changeScreen: () => void) => void;
    onCancelClick?: (changeScreen: () => void) => void;
    onDeleteClick?: () => void;
  };
}

export const ScreenMenu = (props: ScreenMenuProps) => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = props;

  const {
    selectedRow: { selectedRow, setSelectedRow },
  } = useContext(ScreenLocalContext);

  const selectedItem =
    selectedRow !== undefined && Object.values(selectedRow)?.length;

  // Resetar o item da linha selecionada ao mudar a tela    

  useEffect(() => {
    setSelectedRow(undefined as any);
  }, [screenMode]);

  const styles = createStyleMap({
    container: {
      backgroundColor: "#fff",
      border: "1px solid #D3D8DE",
      borderRadius: "4px",
      padding: "2px",
      display: "flex",
      gap: "1rem",
    },
  });

  return (
    <div style={styles.container}>
      <Button
        icon="plus"
        fill
        intent="success"
        disabled={
          screenMode === SCREEN_MODE.EDIT || screenMode === SCREEN_MODE.NEW
        }
        onClick={() => {
          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.NEW);
          };

          props?.actions?.onNewClick?.(changeScreen);
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        disabled={
          screenMode === SCREEN_MODE.EDIT ||
          screenMode === SCREEN_MODE.NEW ||
          !selectedItem
        }
        onClick={(e) => {
          e.preventDefault();

          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.EDIT);
          };

          props?.actions?.onEditClick?.(changeScreen);
        }}
      >
        Editar
      </Button>

      <Button
        icon="floppy-disk"
        fill
        intent="warning"
        disabled={screenMode === SCREEN_MODE.VIEW}
        onClick={(e) => {
          e.preventDefault();

          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.VIEW);
          };

          props?.actions?.onSaveClick?.(changeScreen);
        }}
      >
        Salvar
      </Button>

      <Button
        icon="trash"
        fill
        intent="danger"
        disabled={screenMode !== SCREEN_MODE.VIEW || !selectedItem}
        onClick={() => {
          props?.actions?.onDeleteClick?.();
        }}
      >
        Excluir
      </Button>

      <Button
        icon="disable"
        fill
        intent="none"
        disabled={screenMode === SCREEN_MODE.VIEW}
        onClick={() => {
          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.VIEW);
          };

          props?.actions?.onCancelClick?.(changeScreen);
        }}
      >
        Cancelar
      </Button>
    </div>
  );
};
