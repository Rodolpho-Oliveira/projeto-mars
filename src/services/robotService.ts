import { CreateGridData, CreatePositionData, CreateRobotData } from "../controllers/robotController.js"
import { createNewGrid } from "../repositories/robotRepository.js"

export async function checkGridArea({height, length, userId}: CreateGridData, {instruction}: CreateRobotData, {x, y, direction}: CreatePositionData) {
    if(height < 1 || height > 10 || length < 1 || length > 10){
        throw {type: "Wrong grid area", status: 400}
    }

    if(x < 0 || x > length || y < 0 || y > height){
        throw {type: "Wrong robot position", status: 400}
    }

    if(direction !== "N" && direction !== "S" && direction !== "E" && direction !== "W"){
        throw {type: "Wrong robot direction", status: 400}
    }

    await createNewGrid({height, length, userId}, {instruction}, {x, y, direction})
}
