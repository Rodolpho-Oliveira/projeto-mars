import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import Joi from "joi"
import { checkUserEmail } from "../repositories/userRepository.js"

export async function signUpValidation(req: Request, res: Response, next: NextFunction) {
    const signUpValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    })
    const validation = signUpValidation.validate(req.body)
    if(validation.error){
        throw {type: "Wrong infomartion", status: 400}
    }

    next()
}

export async function signInValidation(req: Request, res: Response, next: NextFunction) {
    const signInValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    const validation = signInValidation.validate(req.body)
    if(validation.error){
        throw {type: "Wrong infomartion", status: 401}
    }

    next()
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers
    const JWT = process.env.JWT_TOKEN
    const token = authorization?.replace("Bearer", "").trim()

    if(!token){
        throw {type: "Authorization token not found", status: 401}
    }

    const tokenData = JSON.stringify(jwt.verify(token, JWT))
    const userData: { email: string } = JSON.parse(tokenData)
    if(!userData){
        throw {type: "Authorization error", status: 401}
    }

    const {id} = await checkUserEmail(userData.email)
    res.locals.user = id

    next()
}