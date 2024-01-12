import type { SimpleGetRequest, SimplePostRequest } from "@giesf/sprit";
import { publishDraft } from "../../../../data/Post";

export async function post(req: SimplePostRequest) {
    const slug = req.params.slug;

    const post = await publishDraft(slug)
    const res = new Response("miau")
    console.log(post)
    res.headers.set("HX-Redirect", post?.slug ? "/posts/" + post.slug : "/admin/")
    console.log(res.headers)
    return res
}