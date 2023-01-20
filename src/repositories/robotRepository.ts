import { db } from "../app/database.js"
import { CreateGridData, CreatePositionData, CreateRobotData } from "../controllers/robotController.js"

export async function createNewGrid({height, length, userId}: CreateGridData, {instruction}: CreateRobotData, {x, y, direction}: CreatePositionData) {
    await db.grid.create({
        data: {
            height,
            length,
            userId,
            robot: {
                create: {
                    instruction,
                    positions: {
                        createMany: {
                            data: [{x,
                                y,
                                direction,
                                type: "start"},
                                ]
                        },
                    }
                }
            }
        }
    })
}