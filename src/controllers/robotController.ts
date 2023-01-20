import {Request, Response} from 'express'
import {Grid} from '@prisma/client'
import { checkGridArea } from '../services/robotService.js'

export type CreateGridData = Omit<Grid, "id" | "createdAt" >

export async function createGrid(req: Request, res: Response) {
    const {height, length}: {height: number, length: number} = req.body
    const id: number = res.locals.user
    
    await checkGridArea({height, length, userId:id})
    res.status(201).send("Grid created")
}