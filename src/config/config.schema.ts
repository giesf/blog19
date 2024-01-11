import { number, object, optional, string, minLength, startsWith } from 'valibot';

export const ConfigSchema = object({
    port: number("Port must be defined"),
    adminUser: string([minLength(3, "Admin username must be at least 3 characters long")]),
    adminPasswordHash: string([startsWith("$argon2id", "Should be an argon2id hash")]),
    sqliteFile: string("Path for SQLITE DB file needs to be defined"),
    configFile: optional(string())
})