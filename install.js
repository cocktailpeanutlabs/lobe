const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let script = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "conda install -y -c conda-forge",
          "git clone https://github.com/lobehub/lobe-chat app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
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
    }]
  }
  let pre_command = pre(config, kernel)
  if (pre_command) {
    script.run[1].params.message = [pre_command].concat(script.run[1].params.message)
  }
  return script
}
