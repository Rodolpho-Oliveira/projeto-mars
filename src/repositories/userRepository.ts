import { db } from "../app/database.js"
import { CreateUserData } from "../controllers/userController.js"

export async function checkUserEmail(email: string) {
    return await db.user.findUnique({
        where: {email}
    })
}

export async function createNewUser(createUserData: CreateUserData) {
    return await db.user.create({data: createUserData})
}