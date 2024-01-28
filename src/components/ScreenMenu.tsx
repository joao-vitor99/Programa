import { Button } from "@blueprintjs/core"
import { createStyleMap } from "../utils"

export const ScreenMenu = () => {

    const styles = createStyleMap({
        container: {
            backgroundColor: "#fff",
            border: "1px solid #D3D8DE",
            borderRadius: "4px",
            padding: "2px",
            display: "flex",
            gap: "1rem"
        }
    })

    return (
        <div style={styles.container}>
            <Button icon="plus" fill intent="success">Novo</Button>

            <Button icon="edit" fill intent="primary">Editar</Button>

            <Button icon="floppy-disk" fill intent="warning">Salvar</Button>

            <Button icon="trash" fill intent="danger">Excluir</Button>
        </div>
    )
}