import express from "express";
import { ClientRouter } from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:1420",
  })
);

const PORT = 3001;

app.get("/info", (req, res) => {
  res.send("version 0.0.1");
});

app.use(ClientRouter);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
