import {Request, Response} from 'express'
import {Grid, Positions, Robot} from '@prisma/client'
import { checkGridArea } from '../services/robotService.js'

export type CreateGridData = Omit<Grid, "id" | "createdAt" >
export type CreateRobotData = Omit<Robot, "id" | "createdAt" | "gridId">
export type CreatePositionData = Omit<Positions, "id" | "createdAt" | "type" | "robotId">

export async function createGrid(req: Request, res: Response) {
    const {height, length}: {height: number, length: number} = req.body
    const {instruction}: CreateRobotData = req.body
    const {x, y, direction}: CreatePositionData = req.body
    const id: number = res.locals.user
    
    await checkGridArea({height, length, userId:id}, {instruction}, {x, y, direction})
    res.status(201).send("Robot created")
}