import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";
import { getDrafts } from "../../data/Post";
import fs from 'fs'
export async function get(req: SimpleGetRequest) {
    try {

        const files = fs.readdirSync("./static/uploads");
        const html = await renderView("admin/file-list", { selectedTab: "files", files, username: config.adminUser })
        return new HTMLResponse(html)
    } catch (err: any) {
        const html = await renderView("admin/file-list", { selectedTab: "files", files: [], err, username: config.adminUser })
        return new HTMLResponse(html)
    }
}