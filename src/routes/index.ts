import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../renderer";
import { config } from "../config/config";
import { getPosts } from "../data/Post";

export async function get(req: SimpleGetRequest) {
    try {
        const posts = await getPosts();
        const html = await renderView("index", { posts, pageTitle: config.pageTitle })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}