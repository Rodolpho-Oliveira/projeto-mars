import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { checkUserEmail, createNewUser } from "../repositories/userRepository.js"
import { CreateUserData } from "../controllers/userController.js"

export async function signUpService({email, password, name}: CreateUserData) {
    const check = await checkUserEmail(email)
    if(check){
        throw {type: "Email already in use", status: 403}
    }
    password = bcrypt.hashSync(password, 10)
    await createNewUser({email,password, name})
}

export async function singInService({email, password}: {email: string, password: string}) {
    const check = await checkUserEmail(email)
    if(!check){
        throw {type: "Wrong email", status: 401}
    }

    const passwordCheck = await bcrypt.compare(password, check.password)
    if(!passwordCheck){
        throw {type: "Wrong password", status: 401}
    }

    const JWT = process.env.JWT_TOKEN

    console.log(check, passwordCheck)

    const token = jwt.sign({ email: check.email }, JWT)
    return token
}