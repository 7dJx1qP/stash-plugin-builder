import path from "path"
import chalk from "chalk"
import { WebSocketServer, WebSocket } from "ws"

import Shared from "../shared/shared"
import { writeFile, getAsset, writeYml, createFolder } from "../utils/glob"

interface WebSocketData {
    connected: boolean
    socket:
        | {
              send: WebSocket["send"]
          }
        | undefined
}

export const webSocketData: WebSocketData = {
    connected: false,
    socket: undefined,
}

export function installReloadClient(stashPluginDir: string) {
    stashPluginDir = path.join(stashPluginDir, "stash-plugin-builder")
    const ReloadClientJsPath = path.join(stashPluginDir, "ReloadClient/ReloadClient.js")
    const ReloadClientYmlPath = path.join(stashPluginDir, "ReloadClient/ReloadClient.yml")

    createFolder(path.join(stashPluginDir, "ReloadClient"))

    writeYml(ReloadClientYmlPath, {
        name: "Stash Plugin Builder - Reload Client",
        description: "Client side code for live-reloading when the source code changes",
        version: "1.0",
        url: "https://github.com/Tetrax-10",
        ui: {
            javascript: ["ReloadClient.js"],
        },
    })

    writeFile(ReloadClientJsPath, getAsset("ReloadClient.js"))
}

export function initReloadServer() {
    const server = new WebSocketServer({ port: 8082 })

    // @ts-expect-error skip
    installReloadClient(Shared.stashPluginDir)

    server.on("connection", (soc) => {
        webSocketData.socket = soc

        if (!webSocketData.connected) console.log(chalk.green("reload-server: connected to stash website"))
        webSocketData.connected = true

        soc.send("connected")

        soc.addEventListener("close", () => {
            webSocketData.socket = undefined
        })
    })

    console.log(chalk.blue("reload-server: reload stash website to establish a connection for auto live-reloading"))
}
