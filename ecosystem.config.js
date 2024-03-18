module.exports = {
    apps: [
        {
            name: "course-qube-server",
            script: "./src/index.js",
            watch: true,
            env: {
                "PORT": 4001,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 4000,
                "NODE_ENV": "production",
            }
        }
    ]
}
