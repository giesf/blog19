import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";

export async function get(req: SimpleGetRequest) {
    try {
        const html = await renderView("admin/dashboard", { username: config.adminUser })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}