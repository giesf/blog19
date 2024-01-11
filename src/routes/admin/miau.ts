import type { SimpleGetRequest } from "@giesf/sprit";

export function get(req: SimpleGetRequest) {
    return new Response("miau")
}