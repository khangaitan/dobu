import 'colors';
import 'dotenv/config'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';

const API_PORT = process.env.API_PORT || 4000

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
	context: async ({ req }) => ({ token: req.headers.token }),
	listen: { port: API_PORT }
})

console.log(`${'Server is on:'.green} ${url.yellow}`)
console.log(`${'Sandbox runs:'.blue} ${'https://studio.apollographql.com/dev'.yellow}`)