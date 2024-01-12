import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";
import { getDrafts } from "../../data/Post";

export async function get(req: SimpleGetRequest) {
    try {
        const drafts = await getDrafts()
        const html = await renderView("admin/dashboard", { selectedTab: "drafts", drafts, username: config.adminUser })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}