import { User } from "@prisma/client"
import { Request, Response } from "express"
import { signUpService, singInService } from "../services/userService.js"

export type CreateUserData = Omit<User, "id" | "createdAt">

export async function signUp(req: Request, res: Response) {
    const {email, password, name}: CreateUserData = req.body
    await signUpService({email, password, name})
    res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
    const {email, password}: {email: string, password: string} = req.body
    const token = await singInService({email, password})
    res.status(200).send(token)
}