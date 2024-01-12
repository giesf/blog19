import { HTTPError, JSONResponse, type SimpleGetRequest, type SimplePostRequest } from "@giesf/sprit";
import { publishDraft, saveDraft } from "../../../../data/Post";

export async function post(req: SimplePostRequest) {
    const slug = req.params.slug;

    const body = req.jsonBody;
    const { title, markdown_body } = body;
    const post = await saveDraft(slug, title, markdown_body)

    if (!post) throw new HTTPError(500, "Err")

    const res = new JSONResponse(post)
    res.headers.set("HX-Redirect", post?.slug ? "/admin/edit/" + post.slug : "/admin/")

    console.log(res.headers)
    return res


}