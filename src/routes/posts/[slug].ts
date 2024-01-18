import { HTMLResponse, type SimpleGetRequest } from "@giesf/sprit";
import { renderView } from "../../renderer";
import { config } from "../../config/config";
import { getPost } from "../../data/Post";

export async function get(req: SimpleGetRequest) {
    try {
        const slug = req.params.slug;
        const post = await getPost(slug)
        const html = await renderView("post", { post, pageTitle: config.pageTitle, githubUrl: config.githubUrl, avatarUrl: config.avatarUrl })
        return new HTMLResponse(html)
    } catch (err: any) {
        return new HTMLResponse(err.message)

    }
}