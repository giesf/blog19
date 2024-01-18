import * as TOML from 'js-toml'
import { ValiError, parse, partial } from 'valibot';
import { defaultConfig, envKeyPrefix, overrideConfig } from './config';
import { envKeyToConfigKey } from './utils';
import { ConfigSchema } from './config.schema';

export const loadConfig = async () => {
    try {
        const envConfig = loadEnvConfig()
        const configFilePath = envConfig.configFile;
        if (typeof configFilePath == "string") {
            const configFileConfig = await loadConfigFileConfig(configFilePath)
            overrideConfig({ ...defaultConfig, ...configFileConfig, ...envConfig })
            return
        }

        overrideConfig({ ...defaultConfig, ...envConfig })
    } catch (err: any) {
        if (err instanceof ValiError) {
            console.error("Configuration error:")
            console.error(err.message)
            process.exit(1)
        } else {
            throw err;
        }
    }
}

export const loadConfigFileConfig = async (configFilePath: string) => {
    try {
        const configFile = Bun.file(configFilePath)
        const fileContents = await configFile.text()
        const rawConfigFileConfig = TOML.load(fileContents)
        return parse(partial(ConfigSchema), rawConfigFileConfig)
    } catch (err: any) {
        console.error(`Error loading the specified config file "${configFilePath}":`)
        console.error(err.message)
        process.exit(1)
    }
}

export const loadEnvConfig = () => {
    const envEntries = Object.entries(process.env).filter(([key]) => key.startsWith(envKeyPrefix))

    const configEntries = envEntries.map(([key, value]) => [envKeyToConfigKey(key), value])

    const rawConfig = Object.fromEntries(configEntries)

    // Hacky but does the job
    if (rawConfig.port) rawConfig.port = parseInt(rawConfig.port)

    return parse(partial(ConfigSchema), rawConfig)
}