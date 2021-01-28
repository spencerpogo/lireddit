import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { __PROD__ } from "./constants";
import MIKRO_CONFIG from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

async function main() {
  const orm = await MikroORM.init(MIKRO_CONFIG);
  await orm.getMigrator().up();

  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer({
    schema,
    tracing: !__PROD__,
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
}

main();
