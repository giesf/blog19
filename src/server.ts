import { HTTPError, JSONErrorResponse, JSONResponse, startHTTPServer } from "@giesf/sprit";
import { config } from "./config/config";
import { guard, parseBasicAuthHeader, verfiyCredentials } from "./auth";
import type { Server } from "bun";
import fs from 'fs'

import { join } from 'path'
let server: undefined | Server;

export const startServer = () => {
    const applicationSupportDir = join(import.meta.dir, "..")
    const cwd = process.cwd()

    //If we are running se_19 somewhere that is not the project directory, copy static files there
    if (cwd != applicationSupportDir) {
        try {
            fs.readdirSync("./static")
        } catch (err) {
            console.log("Creating static dir...")
            fs.cpSync(join(import.meta.dir, "../static"), "./static", { recursive: true })
        }
    }

    server = startHTTPServer({
        port: config.port,
        staticDir: "static",
        routesDir: join(import.meta.dir, "routes"),
        errorResponseFactory: (err) => {
            if (err.statusCode < 500) {
                const res = new JSONErrorResponse(err)
                if ([403, 401].includes(err.statusCode)) {
                    res.headers.set("WWW-Authenticate", 'Basic realm="Access to admin panel"')
                }

                return res;
            } else {
                return new JSONErrorResponse(new HTTPError(500, "Internal Server Error"))
            }
        },
        inspectOrModifyIncomingRequest(req) {
            const { pathname } = new URL(req.url)
            const authHeader = req.headers.get("Authorization")

            guard(pathname, authHeader)

            return req
        },
    })

}

export const stopServer = () => {
    server?.stop()
}