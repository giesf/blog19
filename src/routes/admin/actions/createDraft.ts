import type { SimpleGetRequest, SimplePostRequest } from "@giesf/sprit";
import { createDraft } from "../../../data/Post";

export async function post(req: SimplePostRequest) {
    const draft = await createDraft()
    const res = new Response("miau")
    console.log(draft)
    res.headers.set("HX-Redirect", draft?.slug ? "/admin/edit/" + draft.slug : "/admin/")
    console.log(res.headers)
    return res
}