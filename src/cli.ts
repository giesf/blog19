#!~/.bun/bin/bun

import yargs from 'yargs-parser'
import path from 'path'
import { startServer } from './server'

const args = yargs(Bun.argv);
const binaryName = path.parse(String(args._[1])).base
const command = args._[2]
const commandArguments = args._.slice(3)

type CLICommand = {
    usage: string,
    description?: string,
    handler: Function
}

const commands: {
    [index: string]: CLICommand
} = {
    "serve": {
        "usage": "serve [port]",
        "description": "Serves the web application on port",
        "handler": (port: number) => { startServer(port) }
    }
}

if (typeof command == "string") {
    if (typeof commands[command] == "undefined") {
        console.error("Command does not exist")
        process.exit(1)
    }

    if (args.help) {
        printCommandUsage(commands[command])
        process.exit(0)
    }

    commands[command].handler(...commandArguments)
}
else if (args.help) {
    printHelp()
}

function printHelp() {
    console.log("")
    console.log(`${binaryName} [command]`)
    console.log("")

    for (const cmd of Object.values(commands)) {
        printCommandUsage(cmd)
    }
    console.log("")
}

function printCommandUsage(cmd: CLICommand) {
    console.log("")
    console.log(`   ${binaryName} ${cmd.usage}\t${cmd.description}`)
    console.log("")
}


