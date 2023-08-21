import Helper from "../../db/dao/helper.dao.js";
import Team from "../../db/dao/team.dao.js";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const NEW_HELPER = 'NEW_HELPER';

const HelperBD = new Helper().getInstance();
const TeamBD = new Team().getInstance();

const resolvers = {
    Query: {
        helpers: async () => {
            const allHelpers = await HelperBD.getAll();
            const response = await Promise.all(allHelpers.map(async (helper) => ({
                ...helper.toObject(),
                team: await TeamBD.getById(helper.teamRef)
            })));
            return response;
        },
        teams: async () => await TeamBD.getAll(),
        random: () => Math.random()
    },
    Subscription: {
        newHelper: {
            subscribe: () => pubsub.asyncIterator([NEW_HELPER])
        }
    },
    Mutation: {
        createHelper: async (_, { input }) => {
            const newHelper = await HelperBD.addHelper(input);
            pubsub.publish(NEW_HELPER, { newHelper });
            return newHelper;
        }
    }
};


export { resolvers };
