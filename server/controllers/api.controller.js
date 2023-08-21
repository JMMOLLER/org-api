import { expressMiddleware } from "@apollo/server/express4";
import { apolloServer } from "../graphql/index.js";
import express from "express";
import fs from "fs";

// Read the package.json file
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const apiRouter = async(httpServer) => {
    // Create an express router
    const api = express.Router();
    // Create an Apollo server instance and pass the http server
    const server = await apolloServer(httpServer);

    api.get("/", (req, res) => {
        res.status(200).json({
            "message": "Welcome to the Org GraphQL API. Try fetch /api/graphql",
            "version": pkg.version,
            "developer": pkg.author,
            "repository": pkg.repository,
        });
    });
    // Apply the Apollo GraphQL middleware and set the path to /api/graphql
    api.use("/graphql", express.json(), expressMiddleware(server));

    return api;
}

export default apiRouter;