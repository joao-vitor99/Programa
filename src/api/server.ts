import express from "express"
import { ClientRouter } from "./routes"

const app = express()

app.use(express.json())

const PORT = 3001

app.get("/info", (req, res) => {
    res.send("version 0.0.1")
})

app.use(ClientRouter)

app.listen(PORT, "127.0.0.1", () => {
    console.log(`servidor rodando na porta ${PORT}`)
})