import { describe, test, expect, beforeAll } from 'bun:test'
import { toKebabCase } from '../src/utils/case'

describe("toKebabCase works as expected", () => {

    test("Hello world", () => {
        const text = "Hello World"

        const kb = toKebabCase(text);

        expect(kb).toBe("hello-world")
    })


    test("_", () => {
        const text = "miau_woof"

        const kb = toKebabCase(text);

        expect(kb).toBe("miau-woof")
    })

    test("Special characters", () => {
        const text = "ÄÜÖ?@Hello"

        const kb = toKebabCase(text);

        expect(kb).toBe("hello")
    })




})
