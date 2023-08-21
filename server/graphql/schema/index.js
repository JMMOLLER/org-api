const typeDefs = `
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

export { typeDefs };
