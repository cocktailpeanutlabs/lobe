const path = require('path')
module.exports = {
  version: "2.0",
  title: "Lobe Chat",
  description: "An open-source, modern-design ChatGPT/LLMs UI/Framework. Supports speech-synthesis, multi-modal, and extensible (function call) plugin system. https://github.com/lobehub/lobe-chat",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "node_modules")
    let running = await kernel.running(__dirname, "start.js")
    if (kernel.jsdom) {
      let JSDOM = kernel.jsdom.JSDOM
      let dom = await JSDOM.fromURL("https://ollama.com/library")
      let els = dom.window.document.querySelectorAll("#repo li a")
      let urls = []
      names = []
      for(let el of els) {
        urls.push(el.href)
        names.push(new URL(el.href).pathname.split("/").filter(x => x)[1])
      }
      console.log("names", names)
    }
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        let o = [{
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: local.url,
        }, {
          icon: 'fa-solid fa-terminal',
          text: "Terminal",
          href: "start.js",
        }]
        return o
      } else {
        let o = [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }]
        if (names) {
          o.push({
            icon: "fa-solid fa-circle-down",
            text: "Download Models",
            menu: names.map((name) => {
              return {
                icon: "fa-solid fa-circle-down",
                text: name,
                href: "down.json",
                params: {
                  name
                }
              }
            })
          })
        }
        o = o.concat([{
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }])
        return  o
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
