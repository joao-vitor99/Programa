import { Button } from "@blueprintjs/core";
import { SCREEN_MODE } from "../constants";
import { createStyleMap } from "../utils";

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
  };
}

export const ScreenMenu = (props: ScreenMenuProps) => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = props;

  const itemToDelete = null;
  const itemToEdit = null;

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
          !itemToEdit
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
        disabled={screenMode !== SCREEN_MODE.VIEW || !itemToDelete}
        onClick={() => {
          console.log("abc");
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
