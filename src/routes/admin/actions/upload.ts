import { HTMLResponse, HTTPError, type SimplePostRequest } from "@giesf/sprit";
import { config } from "../../../config/config";
import { renderView } from "../../../renderer";

export const post = async (req: SimplePostRequest) => {
    const formdata = await req.formData();
    const file = formdata.get('file');
    if (!(file instanceof File)) {
        throw new HTTPError(400, "Bad request")
    }

    const allowedFileTypes = ["jpg", "jpeg", "gif", "webp", "png", "svg",]
    const filenameSplit = file.name.split(".")
    const fileSuffix = filenameSplit[filenameSplit.length - 1]

    if (!allowedFileTypes.includes(fileSuffix)) throw new HTTPError(400, "Bad request (filetype)")

    const fileKey = (new Date().getTime()) + "-" + file.name

    await Bun.write('./static/uploads/' + fileKey, file);
    const res = Response.redirect("/admin/file-preview/" + fileKey)
    return res;

}
