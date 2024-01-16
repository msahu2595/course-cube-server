module.exports = {
    apps: [
        {
            name: "course-qube-server",
            script: "./src/index.js",
            watch: false,
            env: {
                "PORT": 4000,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 4000,
                "NODE_ENV": "production",
            }
        }
    ]
}
