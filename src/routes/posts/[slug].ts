import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";

export async function get(req: SimpleGetRequest) {
    try {
        const html = await renderView("post", { username: config.adminUser, pageTitle: "The bare minimum" })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}