import type { SimplePostRequest } from "@giesf/sprit";
import fs from 'fs';
export async function post(req: SimplePostRequest) {
    const filename = req.params.filename;

    fs.unlinkSync("./static/uploads/" + filename)
    const res = new Response("miau")
    res.headers.set("HX-Redirect", "/admin/files")
    console.log(res.headers)
    return res
}