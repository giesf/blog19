import { HTTPError, JSONErrorResponse, JSONResponse, startHTTPServer } from "@giesf/sprit";
import { config } from "./config/config";
import { guard, parseBasicAuthHeader, verfiyCredentials } from "./auth";
import type { Server } from "bun";


let server: undefined | Server;

export const startServer = () => {

    server = startHTTPServer({
        port: config.port,
        errorResponseFactory: (err) => {
            if (err.statusCode < 500) {
                return new JSONErrorResponse(err)
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