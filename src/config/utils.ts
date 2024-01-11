import { envKeyPrefix } from "./config";

export const configKeyToEnvKey = (configKey: string) => envKeyPrefix + configKey.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
export const envKeyToConfigKey = (envKey: string) => envKey.substring(envKeyPrefix.length).toLowerCase().replace(/([-_][a-z])/g, group =>
    group
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
);
