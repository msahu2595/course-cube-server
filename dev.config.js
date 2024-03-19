module.exports = {
    apps: [
        {
            name: "course-qube-server-dev",
            script: "./src/index.js",
            watch: true,
            env: {
                "PORT": 4000,
                "NODE_ENV": "development"
            },
        }
    ]
}
