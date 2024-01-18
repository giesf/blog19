import { parse, type Output } from 'valibot'
import { ConfigSchema } from './config.schema'

export type Config = Output<typeof ConfigSchema>

export const envKeyPrefix = "SE19_"

export const defaultConfig: Config = {
    port: 3000,
    pageTitle: "Blog",
    adminUser: "admin",
    adminPasswordHash: "$argon2id$v=19$m=65536,t=2,p=1$gFOXNWqYyBwLo0L5mlV4FLR4fS3aK/7IMwo1pySciL0$NWT6AjO5rjFcUHtQ6L08KMnEOHvyWdzqgidYTvVLPPQ",
    sqliteFile: "data.sqlite",
    githubURL: "",
    avatarURL: "/static/default-avatar.jpg"
}


export let config: Config = defaultConfig;

export const overrideConfig = (conf: Config) => {
    const nconf = parse(ConfigSchema, conf)
    config = nconf;
}