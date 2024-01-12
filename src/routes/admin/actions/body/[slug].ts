import type { SimpleGetRequest, SimplePostRequest } from "@giesf/sprit";
import { getDraftOrPost, publishDraft } from "../../../../data/Post";

export async function get(req: SimpleGetRequest) {
    const slug = req.params.slug;

    const post = await getDraftOrPost(slug)
    const res = new Response(post?.markdown_body)
    return res
}