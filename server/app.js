import express from "express";
import { createServer } from "http";
import api from "./controllers/api.controller.js";
import morganConfig from "./config/morgan.config.js";
import cors from "cors";

// Create an express server
const app = express();
// Create a http server with express
const httpServer = createServer(app);

// Create an Apollo server instance from the api controller
const apiRouter = await api(httpServer);

// Get the allowed origins from the environment
const ALLOWED_ORIGINS = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");

// Apply middlewares
app.use(morganConfig())
app.use(cors({
    origin: ALLOWED_ORIGINS,
}));
app.use("/api", apiRouter);
app.use("*", ({ res }) => {
    res.status(308).redirect("/api");
});

export default httpServer;