import { createPostTable } from "./Post"

export const initTables = async () => {
    await createPostTable()
}