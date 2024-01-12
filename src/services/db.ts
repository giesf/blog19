import Database from "bun:sqlite";
import { makeService } from "@giesf/sprit"
import { config } from "../config/config";

export const [useDB, setDB] = makeService<Database>()

export async function initDB(override = false) {
    const dbPath = config.sqliteFile;
    const db = new Database(dbPath);
    setDB(db, override)
}


export async function cleanUpDbService() {
    setDB(undefined, true)
}