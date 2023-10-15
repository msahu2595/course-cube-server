require("dotenv").config();

const os = require("os");
const http = require("http");
const cors = require("cors");
const Redis = require("ioredis");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { GraphQLError } = require("graphql");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require("@apollo/server/plugin/landingPage/default");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
// const schemaDirectives = require("./schemaDirectives");
const dataSources = require("./dataSources");

const {
  verifyAccessToken,
  verifyRefreshToken,
  createAccessToken,
} = require("./libs/manageToken");

const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis host
  port: process.env.REDIS_PORT, // Redis port
  password: process.env.REDIS_PASSWORD,
});

// Listener Emitted when Redis successfully makes its initial connection to the Redis server.
redis.on("connect", () => {
  console.log(
    "Redis successfully makes its initial connection to the Redis server"
  );
});

// Listener Emitted when Redis lost connection to the Redis server.
redis.on("close", () => {
  console.log("Redis lost connection to the Redis server.");
});

// Listener Emitted if an error occurs on a connection.
redis.on("error", (error) => {
  console.log("Redis error occurs on a connection.", error);
});

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
  mongoose.connect(process.env.MONGO_URI);
})();

// the function that sets up the global context for each resolver, using the req
// eslint-disable-next-line no-unused-vars
const context = async ({ req }) => {
  try {
    // simple auth check on every request
    const auth = req.headers["authorization"];
    const refreshToken = req.headers["refresh-token"];
    const accessToken = auth && auth.split(" ")[1];
    // console.log({ refreshToken, accessToken });
    if (!accessToken)
      return {
        user: null,
        token: null,
        redis,
        dataSources: dataSources({ user: {} }),
      };
    const user = verifyAccessToken(accessToken);
    if (user) {
      return {
        user,
        token: null,
        redis,
        dataSources: dataSources({ user }),
      };
    }
    if (!refreshToken)
      throw new GraphQLError("Refresh token is null, please log in again.", {
        extensions: { code: "FORBIDDEN", http: { status: 401 } },
      });
    // eslint-disable-next-line no-unused-vars
    const { iat, ...verifiedUser } = verifyRefreshToken(refreshToken);
    const savedRefreshedToken = await redis.get(verifiedUser._id);
    // prettier-ignore
    if (savedRefreshedToken !== refreshToken) throw new GraphQLError(
      "Refresh token is revoked/expired, please log in again.",
      {extensions: {code: "FORBIDDEN", http: { status: 401 }}}
    );
    const newAccessToken = createAccessToken(verifiedUser);
    return {
      user: verifiedUser,
      token: newAccessToken,
      redis,
      dataSources: dataSources({ user: verifiedUser }),
    };
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      error.message || "Unexpected error, please log in again.",
      { extensions: { code: "FORBIDDEN", http: { status: 500 } } }
    );
  }
};

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schemaDirectives,
  includeStacktraceInErrorResponses: true,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({ embed: true })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

(async () => {
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, { context })
  );

  // Start our server if we're not in a test env.
  // if we're in a test env, we'll manually start it in a test
  if (process.env.NODE_ENV !== "test") {
    await new Promise((resolve) =>
      httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
    );

    const networkInterfaces = os.networkInterfaces();
    console.log(`
      Server is running! Listening on port ${
        process.env.PORT
      }, 🚀 Server ready at

      http://localhost:${process.env.PORT || 4000}/

                or

      http://${
        networkInterfaces?.en0?.find((en) => en?.family === "IPv4")?.address
      }:4000/
    `);
  }
})();

// export all the important pieces for integration/e2e tests to use
module.exports = {
  typeDefs,
  resolvers,
  // schemaDirectives,
  context,
  ApolloServer,
  server,
};
