import { date, maxLength, minLength, object, optional, string, toLowerCase, type Output, parse, safeParse, union, number, transform, toCustom, null_, type BaseSchema } from "valibot";
import { toKebabCase } from "../utils/case";
import { sqlite, sqliteOptional } from "../utils/sqlite";
import { HTTPError } from "@giesf/sprit";

const dateAsInt = union([date(), transform(number(), (value) => new Date(value))]);

export const PostSchema = object({
    slug: string([toLowerCase()]),
    title: string([minLength(3, "Title should be at least 3 characters long"), maxLength(180, "Title can not be longer than 180 characters")]),
    markdown_body: string(),
    draft_created_at: dateAsInt,
    last_edited_at: dateAsInt,
    published_at: sqliteOptional(dateAsInt)
})

export type Post = Output<typeof PostSchema>

export const createDraft = async () => {
    const title = "Untitled draft"
    const slug = toKebabCase(title + "-" + new Date().getTime());
    const markdown_body = ""
    const draft_created_at = new Date();
    const last_edited_at = new Date()

    await sqlite`INSERT INTO posts (title, slug, markdown_body, draft_created_at, last_edited_at) VALUES (${title}, ${slug}, ${markdown_body}, ${draft_created_at}, ${last_edited_at});`

    const newDraft = await getDraft(slug)
    return newDraft;
}

export const publishDraft = async (slug: string) => {
    const now = new Date().getTime();
    await sqlite`UPDATE posts SET published_at = ${now} WHERE slug = ${slug};`
    const post = await getPost(slug);
    return post;
}

export const saveDraft = async (slug: string, raw_title: string, raw_markdown_body: string) => {
    const title = parse(PostSchema.entries.title, raw_title);
    const markdown_body = parse(PostSchema.entries.markdown_body, raw_markdown_body);
    const now = new Date().getTime();
    const newSlug = toKebabCase(title)
    await sqlite`UPDATE posts SET title = ${title}, slug = ${newSlug}, markdown_body = ${markdown_body}, last_edited_at = ${now} WHERE slug = ${slug};`

    const post = await getDraftOrPost(newSlug);
    console.log(post?.last_edited_at.getTime(), now)

    return post;
}

export const deletePost = async (slug: string) => {
    await sqlite`DELETE FROM posts WHERE slug = ${slug};`
}

export const getPost = async (slug: string) => {
    const [rawPost] = await sqlite<Post>`SELECT * FROM posts WHERE slug = ${slug};`

    if (!rawPost) return undefined;

    const post = parse(PostSchema, rawPost)

    if (typeof post.published_at == "undefined") return undefined;

    return post;
}


export const getDraft = async (slug: string) => {
    const [rawPost] = await sqlite<Post>`SELECT * FROM posts WHERE slug = ${slug};`

    if (!rawPost) return undefined;

    const post = parse(PostSchema, rawPost)

    if (typeof post.published_at != "undefined") return undefined;

    return post;
}

export const getDraftOrPost = async (slug: string) => {
    const [rawPost] = await sqlite<Post>`SELECT * FROM posts WHERE slug = ${slug};`
    if (!rawPost) return undefined;

    const post = parse(PostSchema, rawPost)

    return post;
}


export const getPosts = async (page: number = 0) => {
    const offset = page * 15;
    const rawPosts = await sqlite<Post>`SELECT * FROM posts WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT ${15} OFFSET ${offset};`
    const posts = rawPosts.filter(rp => {
        const p = safeParse(PostSchema, rp);
        return p.success
    })
    return posts;
}
export const getDrafts = async (page: number = 0) => {
    const rawPosts = await sqlite<Post>`SELECT * FROM posts WHERE published_at IS NULL ORDER BY last_edited_at DESC LIMIT ${15} OFFSET ${15 * page};`
    const posts = rawPosts.filter(rp => {
        const p = safeParse(PostSchema, rp);
        console.log(p)

        return p.success
    })

    return posts;
}

export const createPostTable = async () => {
    await sqlite`CREATE TABLE IF NOT EXISTS posts(
        slug TEXT PRIMARY KEY,
        title TEXT,
        markdown_body TEXT,
        draft_created_at INT,
        last_edited_at INT,
        published_at INT
    );`
}
