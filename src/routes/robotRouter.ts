import { Router } from "express"
import { createGrid } from "../controllers/robotController.js"
import { validateToken } from "../middlewares/authMiddleware.js"

const robotRouter = Router()

robotRouter.post("/robot", validateToken, createGrid)

export default robotRouter