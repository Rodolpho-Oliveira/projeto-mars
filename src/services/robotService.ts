import { CreateGridData } from "../controllers/robotController.js"
import { createNewGrid } from "../repositories/robotRepository.js"

export async function checkGridArea({height, length, userId}: CreateGridData) {
    if(height < 1 || height > 10 || length < 1 || length > 10){
        throw {type: "Wrong grid area", status: 400}
    }

    await createNewGrid({height, length, userId})
}