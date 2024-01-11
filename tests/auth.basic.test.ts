
import { describe, test, expect } from 'bun:test'
import { parseBasicAuthHeader } from '../src/auth'
describe("Basic auth header parsing works", () => {

    test("Works as expected", () => {

        const header = "Basic " + btoa("user:password")

        const { user, password, authType } = parseBasicAuthHeader(header);

        expect(user).toBe("user")
        expect(password).toBe("password")
        expect(authType).toBe("Basic")
    })

    test("Errors when wrong auth scheme", () => {

        expect(() => {
            const header = "Edgy " + btoa("user:password")

            const { user, password, authType } = parseBasicAuthHeader(header);

        }).toThrow()

    })

    test("Errors when no username", () => {

        expect(() => {
            const header = "Edgy " + btoa(":password")

            const { user, password, authType } = parseBasicAuthHeader(header);

        }).toThrow()

    })

    test("Errors when no passpword", () => {

        expect(() => {
            const header = "Edgy " + btoa("user:")

            const { user, password, authType } = parseBasicAuthHeader(header);

        }).toThrow()

    })
})