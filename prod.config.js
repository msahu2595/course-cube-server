module.exports = {
    apps: [
        {
            name: "course-qube-server",
            script: "./src/index.js",
            watch: true,
            env: {
                "PORT": 4003,
                "NODE_ENV": "production",
            }
        }
    ]
}
