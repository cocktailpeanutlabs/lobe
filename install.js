module.exports = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "conda install -y -c conda-forge pnpm",
          "git clone https://github.com/lobehub/lobe-chat app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
        env: {
          "NODE_OPTIONS": "--max-old-space-size=8192"
        },
        path: "app",
        message: [
          "pnpm install",
          "pnpm run build"
        ],
      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
  