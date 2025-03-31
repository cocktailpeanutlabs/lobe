module.exports = {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
//        env: {
//          "OLLAMA_PROXY_URL": "http://127.0.0.1:11434/v1"
//        },
        message: [
          "pnpm start"
        ],
        on: [{ "event": "/http:\/\/[^ ]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }
  ]
}
