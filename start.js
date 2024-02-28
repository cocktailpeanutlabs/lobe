module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        env: {
          "OLLAMA_PROXY_URL": "http://127.0.0.1:11434/v1"
        },
        message: [
          "npm start"
        ],
        on: [{ "event": "/http:\/\/[^ ]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
//    }, {
//      "method": "proxy.start",
//      "params": {
//        "uri": "{{local.url}}",
//        "name": "Local Sharing"
//      }
    }]
  }
  return script
}
