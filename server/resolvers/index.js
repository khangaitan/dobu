export const resolvers = {
    Query: {
        apiStatus: (parent, args, context, info) => {
            return { status: 'The API is working.' }
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            return {
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                email: args.input.email,
            }
        }
    }
}