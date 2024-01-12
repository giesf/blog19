import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";
import { getDrafts, getPosts } from "../../data/Post";

export async function get(req: SimpleGetRequest) {
    try {
        const drafts = await getPosts()
        const html = await renderView("admin/dashboard", { selectedTab: "published", drafts, username: config.adminUser })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}