import { HTMLResponse, HTTPError, JSONResponse, type SimpleGetRequest } from "@giesf/sprit";
import { getDraftOrPost } from "../../../data/Post";
import { renderView } from "../../../renderer";
import { config } from "../../../config/config";

export async function get(req: SimpleGetRequest) {
    const slug = req.params.slug;

    const postOrDraft = await getDraftOrPost(slug)

    if (!postOrDraft) {
        throw new HTTPError(404, "Post not found")
    }

    const html = await renderView("admin/edit", { username: config.adminUser, draft: postOrDraft, pageTitle: "The bare minimum" })
    return new HTMLResponse(html)

}