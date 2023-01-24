import supertest from "supertest"
import app from "../src/app/index.js"
import { faker } from "@faker-js/faker"

let token: string

beforeAll(async () => {
    const body = {
        email: "admin@gmail.com",
        password: "admin"
    }
    const response = await supertest(app).post("/signin").send(body)
    token = response.text
})

describe("Create robot", () => {
    it("Should create a new robot and return 201", async () => {
        const body = {
            height: 5,
            length: 5,
            instruction: "RFRFRFRF",
            x: 1,
            y: 2,
            direction: "N"
            }
            const response = await supertest(app).post("/robot").send(body).set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(201)
    })

    it("Should try to create a new robot with missing information and return 400", async () => {
        const response = await supertest(app).post("/robot").send({}).set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(400)
    }
    )

    it("Should try to create a new robot with wrong information and return 400", async () => {
        const body = {
            height: 15,
            length: 15,
            instruction: "HHHH",
            x: 1,
            y: 2,
            direction: "J"
            }
            const response = await supertest(app).post("/robot").send(body).set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(400)
    }
    )
})