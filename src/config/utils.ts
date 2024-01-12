import { camelCaseToSnakeCase, snakeCaseToCamelCase } from "../utils/case";
import { envKeyPrefix } from "./config";

export const configKeyToEnvKey = (configKey: string) => envKeyPrefix + camelCaseToSnakeCase(configKey).toUpperCase()
export const envKeyToConfigKey = (envKey: string) => snakeCaseToCamelCase(envKey.substring(envKeyPrefix.length).toLowerCase())
