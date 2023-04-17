require("dotenv").config();

const Redis = require("ioredis");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
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
  await mongoose.connect(process.env.MONGO_URI);
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
    if (!refreshToken) throw new Error("Refresh token expired.");
    // eslint-disable-next-line no-unused-vars
    const { iat, ...verifiedUser } = verifyRefreshToken(refreshToken);
    const savedRefreshedToken = await redis.get(verifiedUser._id);
    // prettier-ignore
    if (savedRefreshedToken !== refreshToken) throw new Error("Refresh token expired.");
    const newAccessToken = createAccessToken(verifiedUser);
    return {
      user: verifiedUser,
      token: newAccessToken,
      redis,
      dataSources: dataSources({ user: verifiedUser }),
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "You have to logged in again.");
  }
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schemaDirectives,
  includeStacktraceInErrorResponses: true,
  introspection: true,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({ embed: true })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  startStandaloneServer(server, {
    context,
    listen: {
      port: process.env.PORT || 4000,
    },
  }).then(({ url }) => {
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
  // schemaDirectives,
  context,
  ApolloServer,
  server,
};
