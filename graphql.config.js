module.exports = {
  projects: {
    app: {
      schema: "src/schema.js",
      documents: "**/*.{graphql,js,ts,jsx,tsx}",
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:4000",
          },
        },
      },
    },
  },
};
