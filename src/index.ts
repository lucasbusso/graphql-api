import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import "./mongo.connection.js";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Server ready at ${subscriptionsUrl}`);
});
