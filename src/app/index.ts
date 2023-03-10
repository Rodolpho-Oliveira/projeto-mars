import express, {json} from 'express'
import "express-async-errors"
import cors from 'cors'
import { errorHandler } from '../middlewares/errorHandlerMiddleware.js'
import router from '../routes/generalRouter.js'

const app = express()

app.use(cors())
app.use(json())

app.use(router)
app.use(errorHandler)

export default app