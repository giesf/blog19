import { minLength, object, value, string, parse } from "valibot";
import { config } from "./config/config";
import { HTTPError } from "@giesf/sprit";



export const guard = (pathname: string, authHeader: string | null | undefined) => {
    if (!pathname.startsWith("/admin")) return;

    if (typeof authHeader != "string") throw new HTTPError(401, "Not authorized")

    const { user, password } = parseBasicAuthHeader(authHeader)

    const credentialsAreValid = verfiyCredentials(user, password);

    if (!credentialsAreValid) throw new HTTPError(401, "Not authorized")
}

export const verfiyCredentials = (user: string, pw: string) => {
    const { adminUser, adminPasswordHash } = config

    const isPasswordMatch = Bun.password.verifySync(pw, adminPasswordHash)
    const isUserMatch = adminUser === user;

    return isUserMatch && isPasswordMatch
}


const basicAuthSchema = object({
    authType: string([value("Basic", "Auth scheme should be basic")]),
    user: string([minLength(1, "Username is missing")]),
    password: string([minLength(1, "Password is missing")])
})

export const parseBasicAuthHeader = (header: string) => {
    const [authType, token] = header.split(" ")
    const rawAuth = atob(token);
    const [user, password] = rawAuth.split(":")

    return parse(basicAuthSchema, { user, password, authType })
}

