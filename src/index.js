require("dotenv").config();

const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const schemaDirectives = require("./schemaDirectives");
const dataSources = require("./dataSources");

const { verifyAccessToken } = require("./libs/manageToken");

// Listener Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity.
mongoose.connection.on("connected", () => {
  console.log(
    "Mongoose successfully makes its initial connection to the MongoDB server"
  );
});

// Listener Emitted when Mongoose lost connection to the MongoDB server.
mongoose.connection.on("disconnected", (reason) => {
  console.log("Mongoose lost connection to the MongoDB server.", reason);
});

// Listener Emitted if an error occurs on a connection.
mongoose.connection.on("error", (error) => {
  console.log("Mongoose error occurs on a connection.", error);
});

// creates a mongoose connection once. NOT for every request with self executing function.
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
})();

// the function that sets up the global context for each resolver, using the req
// eslint-disable-next-line no-unused-vars
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (token == null) return { user: null };
  const user = verifyAccessToken(token);
  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
  context,
  introspection: true,
  playground: true,
  debug: true,
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server
    .listen({
      port: process.env.PORT || 4000,
    })
    .then(({ url }) => {
      console.log(`
      Server is running!
      Listening on port ${process.env.PORT}, 🚀 Server ready at ${url}
    `);
    });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
  context,
  ApolloServer,
  server,
};
