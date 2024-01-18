import { number, object, optional, string, minLength, startsWith, url } from 'valibot';

export const ConfigSchema = object({
    port: number("Port must be defined"),
    pageTitle: string([minLength(1, "Page title must be set")]),
    adminUser: string([minLength(3, "Admin username must be at least 3 characters long")]),
    adminPasswordHash: string([startsWith("$argon2id", "Should be an argon2id hash")]),
    sqliteFile: string("Path for SQLITE DB file needs to be defined"),
    githubURL: optional(string()),
    configFile: optional(string())
})