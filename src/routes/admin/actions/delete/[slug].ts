import type { SimplePostRequest } from "@giesf/sprit";
import { deletePost } from "../../../../data/Post";

export async function post(req: SimplePostRequest) {
    const slug = req.params.slug;

    await deletePost(slug)
    const res = new Response("miau")
    res.headers.set("HX-Redirect", "/admin/")
    console.log(res.headers)
    return res
}