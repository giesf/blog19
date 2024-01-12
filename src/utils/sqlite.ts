import { useDB } from "../services/db";
import { union, transform, null_, type BaseSchema } from "valibot";

function constructQuery(strings: TemplateStringsArray, params: any[]) {
    const paramsObj = Object.fromEntries(params.map((v, index) => ["$" + (index + 1), v]).map(([key, value]) => {
        if (value instanceof Date) {
            return [key, value.getTime()]
        }

        return [key, value]
    }))

    let queryString = "";
    for (const i in strings) {
        const index = parseInt(i)
        const chunk = strings[index];

        // Hacky solution to support offset as there seems to be an issue with preparing statements here
        if (chunk.endsWith("OFFSET ") && typeof params[index] == "number") {
            console.log(index)
            queryString += chunk + params[index]
            delete paramsObj["$" + (index + 1)]
        } else {
            queryString += chunk + (typeof params[index] != "undefined" ? "$" + (index + 1) : "")

        }
    }

    return { queryString, paramsObj }
}

export async function sqlite<T>(strings: TemplateStringsArray, ...params: any[]) {
    const db = useDB()

    const { queryString, paramsObj } = constructQuery(strings, params)
    console.log(queryString)
    const query = db.query(queryString)
    return query.all(paramsObj) as Array<T>
}


export async function writeTx(queryToPrepare: string, objectsToWrite: object[]) {
    const db = useDB()
    const insert = db.prepare(queryToPrepare);
    const insertObjs = db.transaction(objs => {
        for (const obj of objs) {
            const dollarObj = Object.fromEntries(Object.entries(obj).map(([k, v]) => ["$" + k, v]))
            insert.run(dollarObj as any);
        }
        return objs.length;
    });

    const count = insertObjs(objectsToWrite);
    return count;
}

export const sqliteOptional = (wrapped: BaseSchema<any, any>) => union([wrapped, transform(null_(), (v) => undefined)])
