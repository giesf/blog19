import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../renderer";
import { config } from "../config/config";
import { getPosts } from "../data/Post";

export async function get(req: SimpleGetRequest) {
    try {
        const imprintFile = Bun.file("./static/imprint.md")
        const imprintBody = await imprintFile.text()
        const html = await renderView("imprint", { imprintBody, pageTitle: config.pageTitle, githubURL: config.githubURL, avatarURL: config.avatarURL })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}