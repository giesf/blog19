import { startHTTPServer } from "@giesf/sprit";


export const startServer = (port: number) => {
    startHTTPServer({ port })
}