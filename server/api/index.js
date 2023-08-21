import { graphqlHTTP } from "express-graphql";
import schema from "../schema/index.js";
import root from "../resolver/index.js";
import experss from "express";

const api = experss.Router();

api.use(
    "/",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

export default api;