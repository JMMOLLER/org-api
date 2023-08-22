import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { resolvers } from "./resolver/index.js";
import { typeDefs } from "./schema/index.js";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

const apolloServer = async (httpServer) => {
    // Create a GraphQL schema and resolvers
    // Create a WebSocket server
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/api/graphql",
    });

    // Create a useServer function that will be used to connect the WebSocket server to the Apollo Server.
    const serverCleanup = useServer({ schema }, wsServer);

    // Create an Apollo Server instance
    const server = new ApolloServer({
        schema,
        plugins: [
            // This plugin makes sure that the server waits until all subscriptions are resolved before shutting down.
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                // This function will be called when the server is stopped, giving us.
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
            // This plugin will be used to show the GraphQL Playground when the NODE_ENV is set to development.
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault({ embed: true, graphRef: process.env.APOLLO_GRAPH_REF })
                : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });

    // Start the Apollo server
    await server.start();

    return server;
};

export { apolloServer };
