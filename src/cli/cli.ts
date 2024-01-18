#!/usr/bin/env bun

import yargs from 'yargs-parser'
import path from 'path'
import { commands, type CLICommand } from './commands';
import { configKeyToEnvKey } from '../config/utils';

const args = yargs(Bun.argv);
const binaryName = "bunx blog19"
const command = args._[2]
const commandArguments = args._.slice(3)

const argEntries = Object.entries(args).filter(([key]) => key != "_")

for (const entry of argEntries) {
    const [key, value] = entry;
    process.env[configKeyToEnvKey(key)] = value;
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
else if (args.help || args.h) {
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



