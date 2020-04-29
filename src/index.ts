import 'reflect-metadata';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import * as resolvers from './resolvers';

const app: express.Application = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

async function main() {
  const schema = await buildSchema({
    resolvers: Object.values(resolvers),
    emitSchemaFile: true,
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`🚀 Server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`))
};

main().catch(error => {
    console.log('Error => ', error);
})


