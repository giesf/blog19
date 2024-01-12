import { loadConfig } from '../config/loader'
import { initTables } from '../data/tables'
import { startServer } from '../server'
import { initDB } from '../services/db'
import { startWizard } from './wizard'

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
    }
}