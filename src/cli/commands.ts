import { loadConfig } from '../config/loader'
import { startServer } from '../server'
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