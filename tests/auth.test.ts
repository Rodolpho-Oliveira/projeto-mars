import supertest from "supertest"
import app from "../src/app/index.js"
import { faker } from "@faker-js/faker"

const testUserInfo = {
        name: "admin",
        email: "admin@gmail.com",
        password: "admin"
    }
 
describe("sign-up test", () => {
    it("Should register new user and return 201", async () => {
        const body = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const response = await supertest(app).post("/signup").send(body)
        expect(response.status).toBe(201)
    })

    it("Should try to create a new user with missing information and return 400", async () => {
        const response = await supertest(app).post("/signup").send({})
        expect(response.status).toBe(400)
    })

    it("Should register a new user with an already register email and return 403", async () => {
        const response = await supertest(app).post("/signup").send(testUserInfo)
        expect(response.status).toBe(403)
    })
})

describe("sign-in test", () => {
    it("Should sign in with correct information and return 200", async () => {
        const response = await supertest(app).post("/signin").send({email: testUserInfo.email, password: testUserInfo.password})
        expect(response.status).toBe(200)
    })

    it("Should sign in with wrong email and return 401", async () => {
        const body = {
            email: "",
            password: testUserInfo.password
        }
        const response = await supertest(app).post("/signin").send(body)
        expect(response.status).toBe(401)
    })

    it("Should sign in with wrong password and return 401", async () => {
        const body = {
            email: testUserInfo.email,
            password: ""
        }
        const response = await supertest(app).post("/signin").send(body)
        expect(response.status).toBe(401)
    })

})