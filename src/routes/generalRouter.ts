import { Router } from "express"
import robotRouter from "./robotRouter.js"
import userRouter from "./userRouter.js"

const router = Router()

router.use(userRouter)
router.use(robotRouter)

export default router