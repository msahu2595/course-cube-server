module.exports = {
    apps: [
        {
            name: "course-qube-server-stage",
            script: "./src/index.js",
            watch: true,
            env: {
                "PORT": 4002,
                "NODE_ENV": "staging",
            }
        }
    ]
}
