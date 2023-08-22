// This function is only used to enable the GraphQL extension syntax highlighting in VS Code. Use gql is no longer needed in Apollo Server 3.0.0.
const gql = (schema)  => schema;

const typeDefs = gql`
    type Query {
        random: Float!
        helpers: [Helper]
        teams: [Team]
    }

    type Helper {
        _id: ID!
        id: String
        name: String
        position: String
        photo: String
        team: Team
    }

    input HelperInput {
        id: String
        name: String
        position: String
        photo: String
        teamRef: String
    }

    type Team {
        _id: ID!
        id: String
        teamName: String
        colors: teamColors
    }

    type teamColors {
        primary: String
        background: String
    }

    type Subscription {
        newHelper: Helper
    }

    type Mutation {
        createHelper(input: HelperInput): Helper
    }
`;

export {
    typeDefs
};
