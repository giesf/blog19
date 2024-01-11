import { describe, test, expect, beforeAll } from 'bun:test'
import { guard, verfiyCredentials } from '../src/auth'
import { defaultConfig, overrideConfig } from '../src/config/config'

describe("[UNIT] Credential verification works as expected", () => {

    beforeAll(() => {
        overrideConfig(defaultConfig)
    })

    test("Right credentials are valid", () => {
        const isValid = verfiyCredentials("admin", "admin")
        expect(isValid).toBe(true)
    })

    test("Wrong credentials are invalid", () => {
        const isValid = verfiyCredentials("maggus", "soeder")
        expect(isValid).toBe(false)
    })
})

describe("[INT] /admin routes are protected", () => {

    beforeAll(() => {
        overrideConfig(defaultConfig)
    })

    test("Fetching /admin routes is denied by default", async () => {

        expect(() => {
            guard("/abc", null)
        }).not.toThrow()

        expect(() => {
            guard("/admin/abc", null)
        }).toThrow()

    })

    test("Basic auth makes everything super-duper secure", async () => {

        expect(() => {
            guard("/admin/abc", "Basic " + btoa("admin:admin"))
        }).not.toThrow()

    })

})