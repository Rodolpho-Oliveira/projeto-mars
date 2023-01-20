import { db } from "../app/database.js"
import { CreateGridData } from "../controllers/robotController.js"

export async function createNewGrid({height, length, userId}: CreateGridData) {
    await db.grid.create({
        data: {
            height,
            length,
            userId
        }
    })
}