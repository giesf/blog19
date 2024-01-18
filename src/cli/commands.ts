import { loadConfig } from '../config/loader'
import { initTables } from '../data/tables'
import { startServer } from '../server'
import { initDB } from '../services/db'
import { startWizard } from './wizard'
import { cpSync } from 'fs'
import { join } from 'path'
export type CLICommand = {
    usage: string,
    description?: string,
    handler: Function
}

export const commands: {
    [index: string]: CLICommand
} = {
    "serve": {
        "usage": "serve --port=<port>",
        "description": "Serves the web application on port",
        "handler": async () => {
            await loadConfig()
            await initDB()
            await initTables()
            startServer()
        }
    },
    "config": {
        "usage": "config",
        "description": "Start the configuration wizard",
        "handler": () => {
            startWizard()
        }
    },
    "overwrite-css": {
        "usage": "overwrite-css",
        "description": "Copy the default css file to static directory",
        "handler": () => {
            const applicationSupportDir = join(import.meta.dir, "../..")
            const cwd = process.cwd()
            if (cwd == applicationSupportDir) {
                console.error("You are in a development environment this ain't gonna work")
                process.exit(1)
                return;
            }
            console.log("Overwriting css...")
            cpSync(join(import.meta.dir, "../../static/base.css"), "./static/base.css", { recursive: true })

        }
    }
}