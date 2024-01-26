import { ButtonGroup, Button } from "@blueprintjs/core"
import { createStyleMap } from "../utils"

export const Home = () => {
    const styles = createStyleMap({
        container: {
            display: "flex",
            height: "100vh"

        },

        menuButtonsContainer: {
            height: "max-content",
        },

        logoContainer: {
            display: "flex",
            justifyContent: "center",
            height: "60px",
            backgroundColor: "red",
            color: "white"

        },

        sidebar: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.5rem"

        },
        content: {
            width: "100%",
            padding: "0.5rem"

        }

    })

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <div style={styles.logoContainer}>logo</div>
                <div style={styles.menuButtonsContainer}>
                    <ButtonGroup vertical fill large>
                        <Button icon="database">Clientes</Button>
                        <Button icon="function">Pedidos</Button>
                    </ButtonGroup>
                </div>

            </div>
            <div style={styles.content}>Content</div>
        </div>
    )
}