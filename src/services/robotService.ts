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

    const finalPosition = await calculateRobotFinalPosition({height, length, userId}, {instruction}, {x, y, direction})

    await createNewGrid({height, length, userId}, {instruction}, {x, y, direction}, finalPosition)

    return finalPosition
}

export async function calculateRobotFinalPosition({height, length, userId}: CreateGridData, {instruction}: CreateRobotData, {x, y, direction}: CreatePositionData) {
    let finalPosition = {x, y, direction}

    for(let i = 0; i < instruction.length; i++){
        if(instruction[i] === "L"){
            finalPosition = turnLeft(finalPosition)
        } else if(instruction[i] === "R"){
            finalPosition = turnRight(finalPosition)
        } else if(instruction[i] === "M"){
            finalPosition = move(finalPosition, height, length)
        }
    }

    return finalPosition
}

function turnLeft({x, y, direction}: CreatePositionData){
    if(direction === "N"){
        direction = "W"
    } else if(direction === "W"){
        direction = "S"
    } else if(direction === "S"){
        direction = "E"
    } else if(direction === "E"){
        direction = "N"
    }

    return {x, y, direction}
}

function turnRight({x, y, direction}: CreatePositionData){
    if(direction === "N"){
        direction = "E"
    } else if(direction === "E"){
        direction = "S"
    } else if(direction === "S"){
        direction = "W"
    } else if(direction === "W"){
        direction = "N"
    }

    return {x, y, direction}
}

function move({x, y, direction}: CreatePositionData, height: number, length: number){
    if(direction === "N"){
        if(y < height){
            y++
        }
    } else if(direction === "E"){
        if(x < length){
            x++
        }
    } else if(direction === "S"){
        if(y > 0){
            y--
        }
    } else if(direction === "W"){
        if(x > 0){
            x--
        }
    }

    return {x, y, direction}
}

